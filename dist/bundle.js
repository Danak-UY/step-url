!function(){var e={61:function(e){const r=new RegExp("(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})");e.exports={CONFIG_PATH:"./step-url.config.json",SPLIT_PARAM:"&",QUERY_PARAM:"%s",JOIN_PARAM:" > ",PARAMS:{name:"_name",url:"_url",search:"_search"},URL_REGEX:r}},851:function(e,r,t){const{testValidUrl:o,urlHasQueryParam:n,replaceQuery:s,joinNames:i,openUrl:c,resolvePath:a,readFile:u,parseJsonFile:l}=t(853),{PARAMS:p,SPLIT_PARAM:f}=t(61),w=(e,r,t)=>{const o=s(e,r);return c(o,`${t&&" | "+t+" "+r}`)};e.exports={getConfigFile:async()=>{const e=a(),r=await u(e);return l(r)},getDividedSteps:(e,r)=>(r.forEach((r=>{e=e.replaceAll(r,f)})),e.split(f).filter((e=>e))),getStepsUrl:(e,r)=>{let t=e;const o=[],n=[];return r.forEach((e=>{if(!t)throw`404 - Step | ${n.join(" : ")}`;const r=t[e],s=r&&r[p.name];s&&o.push(s),n.push(e),t=r})),[t,o]},redirectRoute:(e,r,t)=>{const s=i(r);if(!e)throw`404 - Route ${s&&"| "+s}`;const a=e[p.url];if(a&&o(a))return c(a,s);const u=e[p.search];if(u&&o(u)&&n(u)&&t)return w(u,t,s);if(o(e))return n(e)&&t?w(e,t,s):c(e,s);throw"404 - Url"}}},853:function(e,r,t){const o=t(17),n=t(292),s=t(318),{CONFIG_PATH:i,QUERY_PARAM:c,JOIN_PARAM:a,URL_REGEX:u}=t(61);e.exports={getArgs:()=>process.argv.slice(2),validateArgs:(e,r)=>{if(!e)throw"404 - Arguments"},testValidUrl:e=>u.test(e),urlHasQueryParam:e=>e.includes(t.g.wildcard||c),replaceQuery:(e,r)=>e.replace(t.g.wildcard||c,r),joinNames:e=>e?.join(a),escapeRegExp:e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),openUrl:(e,r)=>{console.log(`"Opening... ${r}"`),s(e)},resolvePath:()=>{try{return console.log(i),o.resolve(__dirname,i)}catch{throw"500 - Config path"}},readFile:e=>n.readFile(e).catch((()=>{throw"500 - Config file"})),parseJsonFile:e=>{try{return JSON.parse(e)}catch{throw"500 - JSON parse"}}}},906:function(e){"use strict";e.exports=(e,r,t)=>{const o=t=>Object.defineProperty(e,r,{value:t,enumerable:!0,writable:!0});return Object.defineProperty(e,r,{configurable:!0,enumerable:!0,get(){const e=t();return o(e),e},set(e){o(e)}}),e}},595:function(e,r,t){"use strict";const o=t(147);let n;e.exports=()=>(void 0===n&&(n=function(){try{return o.statSync("/.dockerenv"),!0}catch(e){return!1}}()||function(){try{return o.readFileSync("/proc/self/cgroup","utf8").includes("docker")}catch(e){return!1}}()),n)},818:function(e,r,t){"use strict";const o=t(37),n=t(147),s=t(595),i=()=>{if("linux"!==process.platform)return!1;if(o.release().toLowerCase().includes("microsoft"))return!s();try{return!!n.readFileSync("/proc/version","utf8").toLowerCase().includes("microsoft")&&!s()}catch(e){return!1}};process.env.__IS_WSL_TEST__?e.exports=i:e.exports=i()},318:function(e,r,t){const o=t(17),n=t(81),{promises:s,constants:i}=t(147),c=t(818),a=t(595),u=t(906),l=o.join(__dirname,"xdg-open"),{platform:p,arch:f}=process,w=(()=>{const e="/mnt/";let r;return async function(){if(r)return r;const t="/etc/wsl.conf";let o=!1;try{await s.access(t,i.F_OK),o=!0}catch{}if(!o)return e;const n=await s.readFile(t,{encoding:"utf8"}),c=/(?<!#.*)root\s*=\s*(?<mountPoint>.*)/g.exec(n);return c?(r=c.groups.mountPoint.trim(),r=r.endsWith("/")?r:`${r}/`,r):e}})(),g=async(e,r)=>{let t;for(const o of e)try{return await r(o)}catch(e){t=e}throw t},d=async e=>{if(e={wait:!1,background:!1,newInstance:!1,allowNonzeroExitCode:!1,...e},Array.isArray(e.app))return g(e.app,(r=>d({...e,app:r})));let r,{name:t,arguments:o=[]}=e.app||{};if(o=[...o],Array.isArray(t))return g(t,(r=>d({...e,app:{name:r,arguments:o}})));const u=[],f={};if("darwin"===p)r="open",e.wait&&u.push("--wait-apps"),e.background&&u.push("--background"),e.newInstance&&u.push("--new"),t&&u.push("-a",t);else if("win32"===p||c&&!a()){const n=await w();r=c?`${n}c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe`:`${process.env.SYSTEMROOT}\\System32\\WindowsPowerShell\\v1.0\\powershell`,u.push("-NoProfile","-NonInteractive","–ExecutionPolicy","Bypass","-EncodedCommand"),c||(f.windowsVerbatimArguments=!0);const s=["Start"];e.wait&&s.push("-Wait"),t?(s.push(`"\`"${t}\`""`,"-ArgumentList"),e.target&&o.unshift(e.target)):e.target&&s.push(`"${e.target}"`),o.length>0&&(o=o.map((e=>`"\`"${e}\`""`)),s.push(o.join(","))),e.target=Buffer.from(s.join(" "),"utf16le").toString("base64")}else{if(t)r=t;else{const e="/"===__dirname;let t=!1;try{await s.access(l,i.X_OK),t=!0}catch{}r=process.versions.electron||"android"===p||e||!t?"xdg-open":l}o.length>0&&u.push(...o),e.wait||(f.stdio="ignore",f.detached=!0)}e.target&&u.push(e.target),"darwin"===p&&o.length>0&&u.push("--args",...o);const h=n.spawn(r,u,f);return e.wait?new Promise(((r,t)=>{h.once("error",t),h.once("close",(o=>{e.allowNonzeroExitCode&&o>0?t(new Error(`Exited with code ${o}`)):r(h)}))})):(h.unref(),h)},h=(e,r)=>{if("string"!=typeof e)throw new TypeError("Expected a `target`");return d({...r,target:e})};function m(e){if("string"==typeof e||Array.isArray(e))return e;const{[f]:r}=e;if(!r)throw new Error(`${f} is not supported`);return r}function x({[p]:e},{wsl:r}){if(r&&c)return m(r);if(!e)throw new Error(`${p} is not supported`);return m(e)}const A={};u(A,"chrome",(()=>x({darwin:"google chrome",win32:"chrome",linux:["google-chrome","google-chrome-stable","chromium"]},{wsl:{ia32:"/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",x64:["/mnt/c/Program Files/Google/Chrome/Application/chrome.exe","/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"]}}))),u(A,"firefox",(()=>x({darwin:"firefox",win32:"C:\\Program Files\\Mozilla Firefox\\firefox.exe",linux:"firefox"},{wsl:"/mnt/c/Program Files/Mozilla Firefox/firefox.exe"}))),u(A,"edge",(()=>x({darwin:"microsoft edge",win32:"msedge",linux:["microsoft-edge","microsoft-edge-dev"]},{wsl:"/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"}))),h.apps=A,h.openApp=(e,r)=>{if("string"!=typeof e)throw new TypeError("Expected a `name`");const{arguments:t=[]}=r||{};if(null!=t&&!Array.isArray(t))throw new TypeError("Expected `appArguments` as Array type");return d({...r,app:{name:e,arguments:t}})},e.exports=h},81:function(e){"use strict";e.exports=require("child_process")},147:function(e){"use strict";e.exports=require("fs")},292:function(e){"use strict";e.exports=require("fs/promises")},37:function(e){"use strict";e.exports=require("os")},17:function(e){"use strict";e.exports=require("path")}},r={};function t(o){var n=r[o];if(void 0!==n)return n.exports;var s=r[o]={exports:{}};return e[o](s,s.exports,t),s.exports}t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),function(){const{getArgs:e,validateArgs:r}=t(853),{getConfigFile:o,getDividedSteps:n,getStepsUrl:s,redirectRoute:i}=t(851);(async()=>{try{const[c,a]=e();r(c,a);const{$routes:u,$combos:l,$configs:{$dividers:p,$wildcard:f,$comboWildcard:w}}=await o();t.g.wildcard=f;const g=n(c,p);if(g[0]===w){const[,...e]=g;console.log(e);const[r]=s(l,e),t=r.map((e=>{const r=n(e,p);return s(u,r)}));return void t.forEach((([e,r])=>{i(e,r)}))}const[d,h]=s(u,g);i(d,h,a)}catch(e){console.warn(e)}})()}()}();