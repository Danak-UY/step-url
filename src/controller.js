const {
  testValidUrl,
  urlHasQueryParam,
  replaceQuery,
  joinNames,
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

  steps.forEach((step) => {
    if (!lastRoute) {
      throw `404 - Step | ${currentSteps.join(" : ")}`;
    }

    const stepRoute = lastRoute[step];
    const stepName = stepRoute && stepRoute[PARAMS.name];
    stepName && namesFound.push(stepName);

    currentSteps.push(step);
    lastRoute = stepRoute;
  });

  return { route: lastRoute, names: namesFound };
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

  if (
    testValidUrl(route[PARAMS.search]) &&
    urlHasQueryParam(route[PARAMS.search]) &&
    query
  ) {
    return openSearchUrl(route[PARAMS.search], query, routeNames);
  }

  throw "404 - Url";
};

const openSearchUrl = (url, query, names) => {
  const routeWithQuery = replaceQuery(url, query);
  return openUrl(routeWithQuery, `${names && " | " + names + " " + query}`);
};

module.exports = { getConfigFile, getDividedSteps, getStepsUrl, redirectRoute };
