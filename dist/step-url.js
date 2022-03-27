#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title Step Url
// @raycast.mode silent
// @raycast.description Open any url based on a registered step route

// Optional parameters:
// @raycast.icon 🤖
// @raycast.argument1 { "type": "text", "placeholder": "Steps" }
// @raycast.argument2 { "type": "text", "placeholder": "Query", "optional": true, "percentEncoded": true }

// Documentation:
// @raycast.author mcaldera

/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 61:
/***/ (function(module) {

const CONFIG_PATH = "./step-url.config.json";
const QUERY_PARAM = "%s";
const SPLIT_PARAM = "&";
const JOIN_PARAM = " > ";
const PARAMS = {
  name: "_name",
  url: "_url",
  search: "_search"
};
const URL_REGEX = new RegExp("(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})");
module.exports = {
  CONFIG_PATH,
  SPLIT_PARAM,
  QUERY_PARAM,
  JOIN_PARAM,
  PARAMS,
  URL_REGEX
};

/***/ }),

/***/ 851:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const {
  testValidUrl,
  urlHasQueryParam,
  replaceQuery,
  joinNames,
  openUrl,
  resolvePath,
  readFile,
  parseJsonFile
} = __webpack_require__(853);

const {
  PARAMS,
  SPLIT_PARAM
} = __webpack_require__(61);

const getConfigFile = async () => {
  const configFilePath = resolvePath();
  const configFileRaw = await readFile(configFilePath);
  const config = parseJsonFile(configFileRaw);
  return config;
};

const getDividedSteps = (steps, dividers) => {
  dividers.forEach(div => {
    steps = steps.replaceAll(div, SPLIT_PARAM);
  });
  return steps.split(SPLIT_PARAM).filter(s => s);
};

const getStepsUrl = (routes, steps) => {
  let lastRoute = routes;
  const namesFound = [];
  const currentSteps = [];
  steps.forEach(step => {
    if (!lastRoute) {
      throw `404 - Step | ${currentSteps.join(" : ")}`;
    }

    const stepRoute = lastRoute[step];
    const stepName = stepRoute && stepRoute[PARAMS.name];
    stepName && namesFound.push(stepName);
    currentSteps.push(step);
    lastRoute = stepRoute;
  });
  return {
    route: lastRoute,
    names: namesFound
  };
};

const redirectRoute = (route, names, query) => {
  const routeNames = joinNames(names);

  if (!route) {
    throw `404 - Route ${routeNames && "| " + routeNames}`;
  }

  if (testValidUrl(route)) {
    if (urlHasQueryParam(route) && query) {
      return openSearchUrl(route, query, routeNames);
    }

    return openUrl(route, routeNames);
  }

  if (testValidUrl(route[PARAMS.url])) {
    return openUrl(route[PARAMS.url], routeNames);
  }

  if (testValidUrl(route[PARAMS.search]) && urlHasQueryParam(route[PARAMS.search]) && query) {
    return openSearchUrl(route[PARAMS.search], query, routeNames);
  }

  throw "404 - Url";
};

const openSearchUrl = (url, query, names) => {
  const routeWithQuery = replaceQuery(url, query);
  return openUrl(routeWithQuery, `${names && " | " + names + " " + query}`);
};

module.exports = {
  getConfigFile,
  getDividedSteps,
  getStepsUrl,
  redirectRoute
};

/***/ }),

/***/ 853:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const path = __webpack_require__(17);

const fsPromises = __webpack_require__(292);

const open = __webpack_require__(318);

const {
  CONFIG_PATH,
  QUERY_PARAM,
  JOIN_PARAM,
  URL_REGEX
} = __webpack_require__(61);

const getArgs = () => {
  return process.argv.slice(2);
};

const validateArgs = (steps, query) => {
  if (!steps) {
    throw "404 - Arguments";
  }
};

const testValidUrl = url => URL_REGEX.test(url);

const urlHasQueryParam = url => url.includes(__webpack_require__.g.wildcard || QUERY_PARAM);

const replaceQuery = (url, query) => url.replace(__webpack_require__.g.wildcard || QUERY_PARAM, query);

const joinNames = names => names.join(JOIN_PARAM);

const escapeRegExp = str => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const openUrl = (url, message) => {
  console.log(`"Opening... ${message}"`);
  open(url);
};

const resolvePath = () => {
  try {
    console.log(CONFIG_PATH);
    return path.resolve(__dirname, CONFIG_PATH);
  } catch {
    throw "500 - Config path";
  }
};

const readFile = filePath => {
  return fsPromises.readFile(filePath).catch(() => {
    throw "500 - Config file";
  });
};

const parseJsonFile = file => {
  try {
    return JSON.parse(file);
  } catch {
    throw "500 - JSON parse";
  }
};

module.exports = {
  getArgs,
  validateArgs,
  testValidUrl,
  urlHasQueryParam,
  replaceQuery,
  joinNames,
  escapeRegExp,
  openUrl,
  resolvePath,
  readFile,
  parseJsonFile
};

/***/ }),

/***/ 906:
/***/ (function(module) {

"use strict";

module.exports = (object, propertyName, fn) => {
	const define = value => Object.defineProperty(object, propertyName, {value, enumerable: true, writable: true});

	Object.defineProperty(object, propertyName, {
		configurable: true,
		enumerable: true,
		get() {
			const result = fn();
			define(result);
			return result;
		},
		set(value) {
			define(value);
		}
	});

	return object;
};


/***/ }),

/***/ 595:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

const fs = __webpack_require__(147);

let isDocker;

function hasDockerEnv() {
	try {
		fs.statSync('/.dockerenv');
		return true;
	} catch (_) {
		return false;
	}
}

function hasDockerCGroup() {
	try {
		return fs.readFileSync('/proc/self/cgroup', 'utf8').includes('docker');
	} catch (_) {
		return false;
	}
}

module.exports = () => {
	if (isDocker === undefined) {
		isDocker = hasDockerEnv() || hasDockerCGroup();
	}

	return isDocker;
};


/***/ }),

/***/ 818:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

const os = __webpack_require__(37);
const fs = __webpack_require__(147);
const isDocker = __webpack_require__(595);

const isWsl = () => {
	if (process.platform !== 'linux') {
		return false;
	}

	if (os.release().toLowerCase().includes('microsoft')) {
		if (isDocker()) {
			return false;
		}

		return true;
	}

	try {
		return fs.readFileSync('/proc/version', 'utf8').toLowerCase().includes('microsoft') ?
			!isDocker() : false;
	} catch (_) {
		return false;
	}
};

if (process.env.__IS_WSL_TEST__) {
	module.exports = isWsl;
} else {
	module.exports = isWsl();
}


/***/ }),

/***/ 318:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const path = __webpack_require__(17);
const childProcess = __webpack_require__(81);
const {promises: fs, constants: fsConstants} = __webpack_require__(147);
const isWsl = __webpack_require__(818);
const isDocker = __webpack_require__(595);
const defineLazyProperty = __webpack_require__(906);

// Path to included `xdg-open`.
const localXdgOpenPath = path.join(__dirname, 'xdg-open');

const {platform, arch} = process;

/**
Get the mount point for fixed drives in WSL.

@inner
@returns {string} The mount point.
*/
const getWslDrivesMountPoint = (() => {
	// Default value for "root" param
	// according to https://docs.microsoft.com/en-us/windows/wsl/wsl-config
	const defaultMountPoint = '/mnt/';

	let mountPoint;

	return async function () {
		if (mountPoint) {
			// Return memoized mount point value
			return mountPoint;
		}

		const configFilePath = '/etc/wsl.conf';

		let isConfigFileExists = false;
		try {
			await fs.access(configFilePath, fsConstants.F_OK);
			isConfigFileExists = true;
		} catch {}

		if (!isConfigFileExists) {
			return defaultMountPoint;
		}

		const configContent = await fs.readFile(configFilePath, {encoding: 'utf8'});
		const configMountPoint = /(?<!#.*)root\s*=\s*(?<mountPoint>.*)/g.exec(configContent);

		if (!configMountPoint) {
			return defaultMountPoint;
		}

		mountPoint = configMountPoint.groups.mountPoint.trim();
		mountPoint = mountPoint.endsWith('/') ? mountPoint : `${mountPoint}/`;

		return mountPoint;
	};
})();

const pTryEach = async (array, mapper) => {
	let latestError;

	for (const item of array) {
		try {
			return await mapper(item); // eslint-disable-line no-await-in-loop
		} catch (error) {
			latestError = error;
		}
	}

	throw latestError;
};

const baseOpen = async options => {
	options = {
		wait: false,
		background: false,
		newInstance: false,
		allowNonzeroExitCode: false,
		...options
	};

	if (Array.isArray(options.app)) {
		return pTryEach(options.app, singleApp => baseOpen({
			...options,
			app: singleApp
		}));
	}

	let {name: app, arguments: appArguments = []} = options.app || {};
	appArguments = [...appArguments];

	if (Array.isArray(app)) {
		return pTryEach(app, appName => baseOpen({
			...options,
			app: {
				name: appName,
				arguments: appArguments
			}
		}));
	}

	let command;
	const cliArguments = [];
	const childProcessOptions = {};

	if (platform === 'darwin') {
		command = 'open';

		if (options.wait) {
			cliArguments.push('--wait-apps');
		}

		if (options.background) {
			cliArguments.push('--background');
		}

		if (options.newInstance) {
			cliArguments.push('--new');
		}

		if (app) {
			cliArguments.push('-a', app);
		}
	} else if (platform === 'win32' || (isWsl && !isDocker())) {
		const mountPoint = await getWslDrivesMountPoint();

		command = isWsl ?
			`${mountPoint}c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe` :
			`${process.env.SYSTEMROOT}\\System32\\WindowsPowerShell\\v1.0\\powershell`;

		cliArguments.push(
			'-NoProfile',
			'-NonInteractive',
			'–ExecutionPolicy',
			'Bypass',
			'-EncodedCommand'
		);

		if (!isWsl) {
			childProcessOptions.windowsVerbatimArguments = true;
		}

		const encodedArguments = ['Start'];

		if (options.wait) {
			encodedArguments.push('-Wait');
		}

		if (app) {
			// Double quote with double quotes to ensure the inner quotes are passed through.
			// Inner quotes are delimited for PowerShell interpretation with backticks.
			encodedArguments.push(`"\`"${app}\`""`, '-ArgumentList');
			if (options.target) {
				appArguments.unshift(options.target);
			}
		} else if (options.target) {
			encodedArguments.push(`"${options.target}"`);
		}

		if (appArguments.length > 0) {
			appArguments = appArguments.map(arg => `"\`"${arg}\`""`);
			encodedArguments.push(appArguments.join(','));
		}

		// Using Base64-encoded command, accepted by PowerShell, to allow special characters.
		options.target = Buffer.from(encodedArguments.join(' '), 'utf16le').toString('base64');
	} else {
		if (app) {
			command = app;
		} else {
			// When bundled by Webpack, there's no actual package file path and no local `xdg-open`.
			const isBundled =  false || __dirname === '/';

			// Check if local `xdg-open` exists and is executable.
			let exeLocalXdgOpen = false;
			try {
				await fs.access(localXdgOpenPath, fsConstants.X_OK);
				exeLocalXdgOpen = true;
			} catch {}

			const useSystemXdgOpen = process.versions.electron ||
				platform === 'android' || isBundled || !exeLocalXdgOpen;
			command = useSystemXdgOpen ? 'xdg-open' : localXdgOpenPath;
		}

		if (appArguments.length > 0) {
			cliArguments.push(...appArguments);
		}

		if (!options.wait) {
			// `xdg-open` will block the process unless stdio is ignored
			// and it's detached from the parent even if it's unref'd.
			childProcessOptions.stdio = 'ignore';
			childProcessOptions.detached = true;
		}
	}

	if (options.target) {
		cliArguments.push(options.target);
	}

	if (platform === 'darwin' && appArguments.length > 0) {
		cliArguments.push('--args', ...appArguments);
	}

	const subprocess = childProcess.spawn(command, cliArguments, childProcessOptions);

	if (options.wait) {
		return new Promise((resolve, reject) => {
			subprocess.once('error', reject);

			subprocess.once('close', exitCode => {
				if (options.allowNonzeroExitCode && exitCode > 0) {
					reject(new Error(`Exited with code ${exitCode}`));
					return;
				}

				resolve(subprocess);
			});
		});
	}

	subprocess.unref();

	return subprocess;
};

const open = (target, options) => {
	if (typeof target !== 'string') {
		throw new TypeError('Expected a `target`');
	}

	return baseOpen({
		...options,
		target
	});
};

const openApp = (name, options) => {
	if (typeof name !== 'string') {
		throw new TypeError('Expected a `name`');
	}

	const {arguments: appArguments = []} = options || {};
	if (appArguments !== undefined && appArguments !== null && !Array.isArray(appArguments)) {
		throw new TypeError('Expected `appArguments` as Array type');
	}

	return baseOpen({
		...options,
		app: {
			name,
			arguments: appArguments
		}
	});
};

function detectArchBinary(binary) {
	if (typeof binary === 'string' || Array.isArray(binary)) {
		return binary;
	}

	const {[arch]: archBinary} = binary;

	if (!archBinary) {
		throw new Error(`${arch} is not supported`);
	}

	return archBinary;
}

function detectPlatformBinary({[platform]: platformBinary}, {wsl}) {
	if (wsl && isWsl) {
		return detectArchBinary(wsl);
	}

	if (!platformBinary) {
		throw new Error(`${platform} is not supported`);
	}

	return detectArchBinary(platformBinary);
}

const apps = {};

defineLazyProperty(apps, 'chrome', () => detectPlatformBinary({
	darwin: 'google chrome',
	win32: 'chrome',
	linux: ['google-chrome', 'google-chrome-stable', 'chromium']
}, {
	wsl: {
		ia32: '/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe',
		x64: ['/mnt/c/Program Files/Google/Chrome/Application/chrome.exe', '/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe']
	}
}));

defineLazyProperty(apps, 'firefox', () => detectPlatformBinary({
	darwin: 'firefox',
	win32: 'C:\\Program Files\\Mozilla Firefox\\firefox.exe',
	linux: 'firefox'
}, {
	wsl: '/mnt/c/Program Files/Mozilla Firefox/firefox.exe'
}));

defineLazyProperty(apps, 'edge', () => detectPlatformBinary({
	darwin: 'microsoft edge',
	win32: 'msedge',
	linux: ['microsoft-edge', 'microsoft-edge-dev']
}, {
	wsl: '/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
}));

open.apps = apps;
open.openApp = openApp;

module.exports = open;


/***/ }),

/***/ 81:
/***/ (function(module) {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ 147:
/***/ (function(module) {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 292:
/***/ (function(module) {

"use strict";
module.exports = require("fs/promises");

/***/ }),

/***/ 37:
/***/ (function(module) {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 17:
/***/ (function(module) {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
const {
  getArgs,
  validateArgs
} = __webpack_require__(853);

const {
  getConfigFile,
  getDividedSteps,
  getStepsUrl,
  redirectRoute
} = __webpack_require__(851);

(async () => {
  try {
    const [steps, query] = getArgs();
    validateArgs(steps, query);
    const {
      routes,
      configs: {
        dividers,
        wildcard
      }
    } = await getConfigFile();
    __webpack_require__.g.wildcard = wildcard;
    const dividedSteps = getDividedSteps(steps, dividers);
    const {
      route,
      names
    } = getStepsUrl(routes, dividedSteps);
    redirectRoute(route, names, query);
  } catch (err) {
    console.warn(err);
  }
})();
}();
/******/ })()
;