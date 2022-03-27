#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title Open Url
// @raycast.mode silent

// Optional parameters:
// @raycast.icon 🤖
// @raycast.argument1 { "type": "text", "placeholder": "Steps" }
// @raycast.argument2 { "type": "text", "placeholder": "Query", "optional": true }

// Documentation:
// @raycast.author mcaldera

(()=>{var e={843:e=>{var r=new RegExp("(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})");e.exports={CONFIG_PATH:"./step-url.config.json",SPLIT_PARAM:"&",QUERY_PARAM:"%s%",JOIN_PARAM:" > ",PARAMS:{name:"_name",url:"_url",search:"_search"},URL_REGEX:r}},812:(e,r,t)=>{function n(e,r,t,n,o,i,a){try{var s=e[i](a),c=s.value}catch(e){return void t(e)}s.done?r(c):Promise.resolve(c).then(n,o)}var o=t(648),i=o.testValidUrl,a=o.urlHasQueryParam,s=o.replaceQuery,c=o.joinNames,u=(o.escapeRegExp,o.openUrl),l=o.resolvePath,p=o.readFile,f=o.parseJsonFile,g=t(843),w=g.PARAMS,d=g.SPLIT_PARAM,h=function(){var e,r=(e=regeneratorRuntime.mark((function e(){var r,t,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=l(),e.next=3,p(r);case 3:return t=e.sent,n=f(t),e.abrupt("return",n);case 6:case"end":return e.stop()}}),e)})),function(){var r=this,t=arguments;return new Promise((function(o,i){var a=e.apply(r,t);function s(e){n(a,o,i,s,c,"next",e)}function c(e){n(a,o,i,s,c,"throw",e)}s(void 0)}))});return function(){return r.apply(this,arguments)}}();e.exports={getConfigFile:h,getDividedSteps:function(e,r){return r.forEach((function(r){e=e.replaceAll(r,d)})),e.split(d).filter((function(e){return e}))},getStepsUrl:function(e,r){var t=e,n=[],o=[];return console.log("script arr ->",r),r.forEach((function(e){if(!t)throw'"404 - Step | '.concat(o.join(" : "));var r=e[w.name];r&&n.push(r),o.push(e),t=t[e]})),{route:t,names:n}},redirectRoute:function(e,r,t){var n=c(r);if(!e)throw"404 - Route | ".concat(n);if(i(e)){if(a(e)){var o=s(e,t);return u(o,"".concat(n," | ").concat(t))}return u(e,n)}if(i(e[w.url]))return u(e[w.url],n);if(a(e[w.search])){var l=s(e[w.search],t);return u(l,"".concat(n," | ").concat(t))}throw"404 - Url"}}},648:(e,r,t)=>{var n=t(17),o=t(292),i=t(318),a=t(843),s=a.CONFIG_PATH,c=a.QUERY_PARAM,u=a.JOIN_PARAM,l=a.URL_REGEX;e.exports={getArgs:function(){return process.argv.slice(2)},validateArgs:function(e,r){if(!e)throw"404 - Arguments"},testValidUrl:function(e){return l.test(e)},urlHasQueryParam:function(e){return e.includes(global.wildcard||c)},replaceQuery:function(e,r){return e.replace(global.wildcard||c,r)},joinNames:function(e){return e.join(u)},escapeRegExp:function(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")},openUrl:function(e,r){console.log('"Opening... '.concat(r,'"')),i(e)},resolvePath:function(){try{return console.log(s),n.resolve(__dirname,s)}catch(e){throw"500 - Config path"}},readFile:function(e){return o.readFile(e).catch((function(){throw"500 - Config file"}))},parseJsonFile:function(e){try{return JSON.parse(e)}catch(e){throw"500 - JSON parse"}}}},906:e=>{"use strict";e.exports=(e,r,t)=>{const n=t=>Object.defineProperty(e,r,{value:t,enumerable:!0,writable:!0});return Object.defineProperty(e,r,{configurable:!0,enumerable:!0,get(){const e=t();return n(e),e},set(e){n(e)}}),e}},595:(e,r,t)=>{"use strict";const n=t(147);let o;e.exports=()=>(void 0===o&&(o=function(){try{return n.statSync("/.dockerenv"),!0}catch(e){return!1}}()||function(){try{return n.readFileSync("/proc/self/cgroup","utf8").includes("docker")}catch(e){return!1}}()),o)},818:(e,r,t)=>{"use strict";const n=t(37),o=t(147),i=t(595),a=()=>{if("linux"!==process.platform)return!1;if(n.release().toLowerCase().includes("microsoft"))return!i();try{return!!o.readFileSync("/proc/version","utf8").toLowerCase().includes("microsoft")&&!i()}catch(e){return!1}};process.env.__IS_WSL_TEST__?e.exports=a:e.exports=a()},318:(e,r,t)=>{const n=t(17),o=t(81),{promises:i,constants:a}=t(147),s=t(818),c=t(595),u=t(906),l=n.join(__dirname,"xdg-open"),{platform:p,arch:f}=process,g=(()=>{const e="/mnt/";let r;return async function(){if(r)return r;const t="/etc/wsl.conf";let n=!1;try{await i.access(t,a.F_OK),n=!0}catch{}if(!n)return e;const o=await i.readFile(t,{encoding:"utf8"}),s=/(?<!#.*)root\s*=\s*(?<mountPoint>.*)/g.exec(o);return s?(r=s.groups.mountPoint.trim(),r=r.endsWith("/")?r:`${r}/`,r):e}})(),w=async(e,r)=>{let t;for(const n of e)try{return await r(n)}catch(e){t=e}throw t},d=async e=>{if(e={wait:!1,background:!1,newInstance:!1,allowNonzeroExitCode:!1,...e},Array.isArray(e.app))return w(e.app,(r=>d({...e,app:r})));let r,{name:t,arguments:n=[]}=e.app||{};if(n=[...n],Array.isArray(t))return w(t,(r=>d({...e,app:{name:r,arguments:n}})));const u=[],f={};if("darwin"===p)r="open",e.wait&&u.push("--wait-apps"),e.background&&u.push("--background"),e.newInstance&&u.push("--new"),t&&u.push("-a",t);else if("win32"===p||s&&!c()){const o=await g();r=s?`${o}c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe`:`${process.env.SYSTEMROOT}\\System32\\WindowsPowerShell\\v1.0\\powershell`,u.push("-NoProfile","-NonInteractive","–ExecutionPolicy","Bypass","-EncodedCommand"),s||(f.windowsVerbatimArguments=!0);const i=["Start"];e.wait&&i.push("-Wait"),t?(i.push(`"\`"${t}\`""`,"-ArgumentList"),e.target&&n.unshift(e.target)):e.target&&i.push(`"${e.target}"`),n.length>0&&(n=n.map((e=>`"\`"${e}\`""`)),i.push(n.join(","))),e.target=Buffer.from(i.join(" "),"utf16le").toString("base64")}else{if(t)r=t;else{const e="/"===__dirname;let t=!1;try{await i.access(l,a.X_OK),t=!0}catch{}r=process.versions.electron||"android"===p||e||!t?"xdg-open":l}n.length>0&&u.push(...n),e.wait||(f.stdio="ignore",f.detached=!0)}e.target&&u.push(e.target),"darwin"===p&&n.length>0&&u.push("--args",...n);const h=o.spawn(r,u,f);return e.wait?new Promise(((r,t)=>{h.once("error",t),h.once("close",(n=>{e.allowNonzeroExitCode&&n>0?t(new Error(`Exited with code ${n}`)):r(h)}))})):(h.unref(),h)},h=(e,r)=>{if("string"!=typeof e)throw new TypeError("Expected a `target`");return d({...r,target:e})};function m(e){if("string"==typeof e||Array.isArray(e))return e;const{[f]:r}=e;if(!r)throw new Error(`${f} is not supported`);return r}function v({[p]:e},{wsl:r}){if(r&&s)return m(r);if(!e)throw new Error(`${p} is not supported`);return m(e)}const y={};u(y,"chrome",(()=>v({darwin:"google chrome",win32:"chrome",linux:["google-chrome","google-chrome-stable","chromium"]},{wsl:{ia32:"/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",x64:["/mnt/c/Program Files/Google/Chrome/Application/chrome.exe","/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"]}}))),u(y,"firefox",(()=>v({darwin:"firefox",win32:"C:\\Program Files\\Mozilla Firefox\\firefox.exe",linux:"firefox"},{wsl:"/mnt/c/Program Files/Mozilla Firefox/firefox.exe"}))),u(y,"edge",(()=>v({darwin:"microsoft edge",win32:"msedge",linux:["microsoft-edge","microsoft-edge-dev"]},{wsl:"/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"}))),h.apps=y,h.openApp=(e,r)=>{if("string"!=typeof e)throw new TypeError("Expected a `name`");const{arguments:t=[]}=r||{};if(null!=t&&!Array.isArray(t))throw new TypeError("Expected `appArguments` as Array type");return d({...r,app:{name:e,arguments:t}})},e.exports=h},81:e=>{"use strict";e.exports=require("child_process")},147:e=>{"use strict";e.exports=require("fs")},292:e=>{"use strict";e.exports=require("fs/promises")},37:e=>{"use strict";e.exports=require("os")},17:e=>{"use strict";e.exports=require("path")}},r={};function t(n){var o=r[n];if(void 0!==o)return o.exports;var i=r[n]={exports:{}};return e[n](i,i.exports,t),i.exports}(()=>{function e(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function r(e,r,t,n,o,i,a){try{var s=e[i](a),c=s.value}catch(e){return void t(e)}s.done?r(c):Promise.resolve(c).then(n,o)}var n,o=t(648),i=o.getArgs,a=o.validateArgs,s=t(812),c=s.getConfigFile,u=s.getDividedSteps,l=s.getStepsUrl,p=s.redirectRoute;(n=regeneratorRuntime.mark((function r(){var t,n,o,s,f,g,w,d,h,m,v,y,x;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,t=i(),P=2,n=function(e){if(Array.isArray(e))return e}(A=t)||function(e,r){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,o,i=[],a=!0,s=!1;try{for(t=t.call(e);!(a=(n=t.next()).done)&&(i.push(n.value),!r||i.length!==r);a=!0);}catch(e){s=!0,o=e}finally{try{a||null==t.return||t.return()}finally{if(s)throw o}}return i}}(A,P)||function(r,t){if(r){if("string"==typeof r)return e(r,t);var n=Object.prototype.toString.call(r).slice(8,-1);return"Object"===n&&r.constructor&&(n=r.constructor.name),"Map"===n||"Set"===n?Array.from(r):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?e(r,t):void 0}}(A,P)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),o=n[0],s=n[1],a(o,s),console.log("script args ->",o,s),r.next=6,c();case 6:f=r.sent,g=f.routes,w=f.configs,d=w.dividers,h=w.wildcard,global.wildcard=h,m=u(o,d),v=l(g,m),y=v.route,x=v.names,p(y,x,s),r.next=20;break;case 17:r.prev=17,r.t0=r.catch(0),console.log(r.t0);case 20:case"end":return r.stop()}var A,P}),r,null,[[0,17]])})),function(){var e=this,t=arguments;return new Promise((function(o,i){var a=n.apply(e,t);function s(e){r(a,o,i,s,c,"next",e)}function c(e){r(a,o,i,s,c,"throw",e)}s(void 0)}))})()})()})();