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

  return [lastRoute, namesFound];
};

const redirectRoute = (route, names, query) => {
  const routeNames = joinNames(names);

  if (!route) {
    throw `404 - Route ${routeNames && "| " + routeNames}`;
  }

  const routeSearch = route[PARAMS.search];
  if (
    routeSearch &&
    testValidUrl(routeSearch) &&
    urlHasQueryParam(routeSearch) &&
    query
  ) {
    return openSearchUrl(routeSearch, query, routeNames);
  }

  const routeUrl = route[PARAMS.url];
  if (routeUrl && testValidUrl(routeUrl)) {
    return openUrl(routeUrl, routeNames);
  }

  if (testValidUrl(route)) {
    if (urlHasQueryParam(route) && query) {
      return openSearchUrl(route, query, routeNames);
    }

    return openUrl(route, routeNames);
  }

  throw "404 - Url";
};

const openSearchUrl = (url, query, names) => {
  const routeWithQuery = replaceQuery(url, query);
  return openUrl(routeWithQuery, `${names && " | " + names + " " + query}`);
};

module.exports = { getConfigFile, getDividedSteps, getStepsUrl, redirectRoute };
