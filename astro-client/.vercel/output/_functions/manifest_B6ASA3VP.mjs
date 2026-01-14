import 'piccolore';
import { p as decodeKey } from './chunks/astro/server_C-PX_z3J.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_T1mnuq6X.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Victor/Documents/Coding/pjames/astro-client/","cacheDir":"file:///C:/Users/Victor/Documents/Coding/pjames/astro-client/node_modules/.astro/","outDir":"file:///C:/Users/Victor/Documents/Coding/pjames/astro-client/dist/","srcDir":"file:///C:/Users/Victor/Documents/Coding/pjames/astro-client/src/","publicDir":"file:///C:/Users/Victor/Documents/Coding/pjames/astro-client/public/","buildClientDir":"file:///C:/Users/Victor/Documents/Coding/pjames/astro-client/dist/client/","buildServerDir":"file:///C:/Users/Victor/Documents/Coding/pjames/astro-client/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/brief","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/brief\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"brief","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/brief.ts","pathname":"/api/brief","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/chat","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/chat\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"chat","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/chat.ts","pathname":"/api/chat","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/lead","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/lead\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"lead","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/lead.ts","pathname":"/api/lead","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/newsletter","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/newsletter\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"newsletter","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/newsletter.ts","pathname":"/api/newsletter","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.Buwy1xlL.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Victor/Documents/Coding/pjames/astro-client/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/api/brief@_@ts":"pages/api/brief.astro.mjs","\u0000@astro-page:src/pages/api/chat@_@ts":"pages/api/chat.astro.mjs","\u0000@astro-page:src/pages/api/lead@_@ts":"pages/api/lead.astro.mjs","\u0000@astro-page:src/pages/api/newsletter@_@ts":"pages/api/newsletter.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_B6ASA3VP.mjs","C:/Users/Victor/Documents/Coding/pjames/astro-client/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_nlTn6imK.mjs","C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/chat/ChatBot.tsx":"_astro/ChatBot.pVoDtwiE.js","@astrojs/solid-js/client.js":"_astro/client.BF-vnTii.js","C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/layout/Navbar.astro?astro&type=script&index=0&lang.ts":"_astro/Navbar.astro_astro_type_script_index_0_lang.CTU09UZg.js","C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/layout/MobileNavOverlay.astro?astro&type=script&index=0&lang.ts":"_astro/MobileNavOverlay.astro_astro_type_script_index_0_lang.BE14EQ4Z.js","C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/layout/BackToTop.astro?astro&type=script&index=0&lang.ts":"_astro/BackToTop.astro_astro_type_script_index_0_lang.COhOegOj.js","C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/modals/PricingModal.astro?astro&type=script&index=0&lang.ts":"_astro/PricingModal.astro_astro_type_script_index_0_lang.BP368cCs.js","C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/modals/ProjectModal.astro?astro&type=script&index=0&lang.ts":"_astro/ProjectModal.astro_astro_type_script_index_0_lang.DyJDnmGG.js","C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/forms/BriefForm.astro?astro&type=script&index=0&lang.ts":"_astro/BriefForm.astro_astro_type_script_index_0_lang.BrPno9fd.js","C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/forms/NewsletterForm.astro?astro&type=script&index=0&lang.ts":"_astro/NewsletterForm.astro_astro_type_script_index_0_lang.GL9QlxGI.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/layout/Navbar.astro?astro&type=script&index=0&lang.ts","const i=()=>{const e=document.getElementById(\"nav-container\"),c=document.querySelectorAll(\".nav-link\"),l=document.querySelectorAll(\"section[id], header[id], footer[id]\");if(!e)return;const a=window.innerHeight,r=()=>{const t=window.scrollY>a*.5;e.classList.toggle(\"opacity-0\",!t),e.classList.toggle(\"-translate-y-3\",!t),e.classList.toggle(\"pointer-events-none\",!t),e.setAttribute(\"aria-hidden\",String(!t))},d={root:null,rootMargin:\"-20% 0px -70% 0px\",threshold:0},g=new IntersectionObserver(n=>{n.forEach(t=>{if(t.isIntersecting){const u=t.target.id;c.forEach(o=>{const v=o.querySelector(\".nav-bg\"),s=o.getAttribute(\"href\")===`#${u}`;o.classList.toggle(\"text-text\",s),o.classList.toggle(\"text-muted\",!s),v?.classList.toggle(\"hidden\",!s)})}})},d);l.forEach(n=>g.observe(n)),window.addEventListener(\"scroll\",r,{passive:!0}),r()};document.addEventListener(\"DOMContentLoaded\",i);document.addEventListener(\"astro:page-load\",i);"],["C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/layout/MobileNavOverlay.astro?astro&type=script&index=0&lang.ts","const d=()=>{const o=document.getElementById(\"nav-toggle\"),e=document.getElementById(\"mobile-nav\"),c=document.getElementById(\"mobile-nav-close\"),i=document.querySelectorAll(\".mobile-nav-link\");if(!o||!e||!c)return;const s=()=>{e.classList.remove(\"opacity-0\",\"pointer-events-none\"),document.body.style.overflow=\"hidden\"},t=()=>{e.classList.add(\"opacity-0\",\"pointer-events-none\"),document.body.style.overflow=\"\"};o.addEventListener(\"click\",s),c.addEventListener(\"click\",t),i.forEach(n=>{n.addEventListener(\"click\",t)}),document.addEventListener(\"keydown\",n=>{n.key===\"Escape\"&&!e.classList.contains(\"opacity-0\")&&t()})};document.addEventListener(\"DOMContentLoaded\",d);document.addEventListener(\"astro:page-load\",d);"],["C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/layout/BackToTop.astro?astro&type=script&index=0&lang.ts","const n=()=>{const t=document.getElementById(\"back-to-top\");if(!t)return;const e=()=>{const o=window.scrollY>window.innerHeight*.5;t.classList.toggle(\"opacity-0\",!o),t.classList.toggle(\"pointer-events-none\",!o)};t.addEventListener(\"click\",()=>{window.scrollTo({top:0,behavior:\"smooth\"})}),window.addEventListener(\"scroll\",e,{passive:!0}),e()};document.addEventListener(\"DOMContentLoaded\",n);document.addEventListener(\"astro:page-load\",n);"],["C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/modals/PricingModal.astro?astro&type=script&index=0&lang.ts","const d=()=>{const e=document.getElementById(\"pricing-modal\"),t=document.getElementById(\"pricing-btn\"),n=document.getElementById(\"pricing-modal-close\");!e||!t||!n||(t.addEventListener(\"click\",()=>e.showModal()),n.addEventListener(\"click\",()=>e.close()),e.addEventListener(\"click\",o=>{o.target===e&&e.close()}))};document.addEventListener(\"DOMContentLoaded\",d);document.addEventListener(\"astro:page-load\",d);"],["C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/modals/ProjectModal.astro?astro&type=script&index=0&lang.ts","const u=()=>{const e=document.getElementById(\"project-modal\"),m=document.getElementById(\"project-modal-close\"),y=document.querySelectorAll(\".project-card\");if(!e||!m)return;const o=document.getElementById(\"project-modal-image\"),g=document.getElementById(\"project-modal-category\"),E=document.getElementById(\"project-modal-title\"),p=document.getElementById(\"project-modal-details\"),s=document.getElementById(\"project-modal-tools\"),i=document.getElementById(\"project-modal-gallery\"),r=document.getElementById(\"project-modal-link\");y.forEach(a=>{a.addEventListener(\"click\",()=>{const t=a;if(o&&(o.src=t.dataset.image||\"\",o.alt=t.dataset.title||\"\"),g&&(g.textContent=t.dataset.category||\"\"),E&&(E.textContent=t.dataset.title||\"\"),p&&(p.textContent=t.dataset.details||\"\"),s&&(s.innerHTML=\"\",(t.dataset.tools||\"\").split(\",\").filter(Boolean).forEach(c=>{const n=document.createElement(\"span\");n.className=\"px-3 py-1 rounded-full bg-white/10 text-sm text-muted\",n.textContent=c.trim(),s.appendChild(n)})),i&&(i.innerHTML=\"\",(t.dataset.gallery||\"\").split(\",\").filter(Boolean).forEach((c,n)=>{const l=document.createElement(\"img\");l.src=c.trim(),l.alt=`${t.dataset.title} gallery ${n+1}`,l.className=\"rounded-lg aspect-video object-cover cursor-pointer hover:opacity-80 transition\",l.addEventListener(\"click\",()=>{o&&(o.src=c.trim())}),i.appendChild(l)})),r){const d=t.dataset.link||\"#\";r.href=d,r.style.display=d===\"#\"?\"none\":\"inline-flex\"}e.showModal()})}),m.addEventListener(\"click\",()=>e.close()),e.addEventListener(\"click\",a=>{a.target===e&&e.close()})};document.addEventListener(\"DOMContentLoaded\",u);document.addEventListener(\"astro:page-load\",u);"],["C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/forms/BriefForm.astro?astro&type=script&index=0&lang.ts","const i=()=>{const t=document.getElementById(\"brief-form\"),o=document.getElementById(\"brief-notice\");if(!t||!o)return;const r=(a,e=!1)=>{o.textContent=a,o.className=`mb-4 p-4 rounded-xl text-sm ${e?\"bg-red-500/20 text-red-300 border border-red-500/30\":\"bg-green-500/20 text-green-300 border border-green-500/30\"}`,o.classList.remove(\"hidden\")};t.addEventListener(\"submit\",async a=>{a.preventDefault();const e=new FormData(t),d={name:e.get(\"name\"),email:e.get(\"email\"),business:e.get(\"business\"),package:e.get(\"package\"),details:e.get(\"details\"),ts:new Date().toISOString(),source:\"website-brief\"},n=t.querySelector('button[type=\"submit\"]'),c=n.textContent;n.textContent=\"Sending...\",n.disabled=!0;try{const s=await fetch(\"/api/brief\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify(d)});if(s.ok)r(\"Brief sent! I'll get back to you within 24 hours. 🚀\"),t.reset();else{const m=await s.text();r(m||\"Something went wrong. Try again.\",!0)}}catch{r(\"Couldn't send. Email me directly at pjames1643@gmail.com\",!0)}finally{n.textContent=c,n.disabled=!1}})};document.addEventListener(\"DOMContentLoaded\",i);document.addEventListener(\"astro:page-load\",i);"],["C:/Users/Victor/Documents/Coding/pjames/astro-client/src/components/forms/NewsletterForm.astro?astro&type=script&index=0&lang.ts","const a=()=>{const t=document.getElementById(\"newsletter-form\"),e=document.getElementById(\"newsletter-status\");!t||!e||t.addEventListener(\"submit\",async o=>{o.preventDefault();const r={email:new FormData(t).get(\"email\"),ts:new Date().toISOString()},n=t.querySelector('button[type=\"submit\"]'),i=n.textContent;n.textContent=\"Subscribing...\",n.disabled=!0;try{const s=await(await fetch(\"/api/newsletter\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify(r)})).json();e.textContent=s.message||\"Thanks for subscribing! 🚀\",e.classList.remove(\"hidden\"),s.isNew!==!1&&t.reset()}catch{e.textContent=\"Something went wrong. Try again later.\",e.classList.remove(\"hidden\")}finally{n.textContent=i,n.disabled=!1}})};document.addEventListener(\"DOMContentLoaded\",a);document.addEventListener(\"astro:page-load\",a);"]],"assets":["/_astro/index.Buwy1xlL.css","/favicon.png","/favicon.svg","/hero-ai.png","/hero-bg.png","/logo-new.png","/profile.jpg","/project-1.png","/project-2.png","/project-3.png","/testimonial_adeyemi.png","/testimonial_afolabi.png","/testimonial_ibrahim.png","/_astro/ChatBot.pVoDtwiE.js","/_astro/client.BF-vnTii.js","/_astro/web.PHWK_1bi.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"0ZB6oKdYXQSkX+PCeilLMAxRriN52ax19q6TOUysAa4="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
