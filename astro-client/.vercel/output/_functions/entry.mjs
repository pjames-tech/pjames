import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BpNGbQQ-.mjs';
import { manifest } from './manifest_B6ASA3VP.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/brief.astro.mjs');
const _page2 = () => import('./pages/api/chat.astro.mjs');
const _page3 = () => import('./pages/api/lead.astro.mjs');
const _page4 = () => import('./pages/api/newsletter.astro.mjs');
const _page5 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/brief.ts", _page1],
    ["src/pages/api/chat.ts", _page2],
    ["src/pages/api/lead.ts", _page3],
    ["src/pages/api/newsletter.ts", _page4],
    ["src/pages/index.astro", _page5]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "a43b29cf-8a21-4632-a28f-a04e0e7e7828",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
