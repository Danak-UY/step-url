const {
  testValidUrl,
  urlHasQueryParam,
  replaceQuery,
  joinNames,
  escapeRegExp,
  openUrl,
  resolvePath,
  readFile,
  parseJsonFile,
} = require("./utils");

const { PARAMS, SPLIT_PARAM } = require("./constants");

const getConfigFile = async () => {
  const configFilePath = resolvePath();
  const configFileRaw = await readFile(configFilePath);
  const config = parseJsonFile(configFileRaw);

  return config;
};

const getDividedSteps = (steps, dividers) => {
  dividers.forEach((div) => {
    steps = steps.replaceAll(div, SPLIT_PARAM);
  });

  return steps.split(SPLIT_PARAM).filter((s) => s);
};

const getStepsUrl = (routes, steps) => {
  let lastRoute = routes;
  const namesFound = [];
  const currentSteps = [];

  console.log("script arr ->", steps);
  steps.forEach((step) => {
    if (!lastRoute) {
      throw `"404 - Step | ${currentSteps.join(" : ")}`;
    }

    const stepName = step[PARAMS.name];
    stepName && namesFound.push(stepName);

    currentSteps.push(step);
    lastRoute = lastRoute[step];
  });

  return { route: lastRoute, names: namesFound };
};

const redirectRoute = (route, names, query) => {
  const routeNames = joinNames(names);

  if (!route) {
    throw `404 - Route | ${routeNames}`;
  }

  if (testValidUrl(route)) {
    if (urlHasQueryParam(route)) {
      const routeWithQuery = replaceQuery(route, query);
      return openUrl(routeWithQuery, `${routeNames} | ${query}`);
    }

    return openUrl(route, routeNames);
  }

  if (testValidUrl(route[PARAMS.url])) {
    return openUrl(route[PARAMS.url], routeNames);
  }

  if (urlHasQueryParam(route[PARAMS.search])) {
    const routeWithQuery = replaceQuery(route[PARAMS.search], query);
    return openUrl(routeWithQuery, `${routeNames} | ${query}`);
  }

  throw "404 - Url";
};

module.exports = { getConfigFile, getDividedSteps, getStepsUrl, redirectRoute };
