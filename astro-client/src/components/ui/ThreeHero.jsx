import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeHero() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    // PERFORMANCE: Cap pixel ratio to 2 to prevent lag on 4k/Retina screens
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Geometry - Icosahedron Wireframe
    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0xff7300,
      emissive: 0xff7300,
      emissiveIntensity: 2.5,
      wireframe: true,
      transparent: true,
      opacity: 0.9,
      toneMapped: false,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Inner Glow (Point Light)
    const light = new THREE.PointLight(0xff7300, 1, 100);
    light.position.set(0, 0, 0);
    scene.add(light);

    camera.position.z = 5;

    // State for interactions
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    let baseIntensity = 2.5; // From previous MeshStandardMaterial
    let targetIntensity = 2.5;

    // Listeners
    const onMouseMove = (event) => {
      // Normalize mouse pos from -1 to 1
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onAutomationChange = (event) => {
      const level = event.detail.level; // 0 to 100
      // Increase intensity based on level.
      // e.g., if level is 100, add 5.0 intensity. 50 add 2.5.
      const intensityBoost = (level / 100) * 5;
      targetIntensity = baseIntensity + intensityBoost;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("automation-change", onAutomationChange);

    // Animation Loop
    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Mouse Follow "Lag" Effect using Lerp
      // We want the sphere to rotate towards the mouse position slightly
      // The 0.05 factor controls the "lag" or smoothing speed
      targetRotationX = mouseY * 0.5; // Max rotation tilt
      targetRotationY = mouseX * 0.5;

      sphere.rotation.x += (targetRotationX - sphere.rotation.x) * 0.05;
      sphere.rotation.y += (targetRotationY - sphere.rotation.y) * 0.05;

      // Constant slow rotation on top (optional, or replace with just mouse)
      // If we want it to keep spinning but ALSO tilt:
      sphere.rotation.x += 0.002;
      sphere.rotation.y += 0.002;

      // Reactive Emissive Intensity
      // Lerp current intensity to target
      if (material.emissiveIntensity !== targetIntensity) {
        material.emissiveIntensity +=
          (targetIntensity - material.emissiveIntensity) * 0.05;
      }

      // Pulsating Scale
      const scale = 1 + Math.sin(Date.now() * 0.001) * 0.1;
      sphere.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("automation-change", onAutomationChange);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none blur-[2px]"
      style={{ zIndex: 0 }}
    />
  );
}
