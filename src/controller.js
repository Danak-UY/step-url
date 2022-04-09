const {
  testValidUrl,
  urlHasQueryParam,
  replaceQuery,
  openUrl,
  resolvePath,
  readFile,
  parseJsonFile,
} = require("./utils");

const { generateMessage } = require("./logs");

const { PARAMS, SPLIT_PARAM, STATUS } = require("./constants");

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

  return steps.split(SPLIT_PARAM).filter(Boolean);
};

const getStepsUrl = (routes, steps) => {
  let lastRoute = routes;
  const namesFound = [];
  const currentSteps = [];

  steps.forEach((step) => {
    if (!lastRoute) {
      throw generateMessage(STATUS.NOT_FOUND, "Step", currentSteps);
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
  if (!route) {
    throw generateMessage(STATUS.NOT_FOUND, "Route", names);
  }

  const routeSearch = route[PARAMS.search];
  if (
    routeSearch &&
    testValidUrl(routeSearch) &&
    urlHasQueryParam(routeSearch) &&
    query
  ) {
    return openSearchUrl(routeSearch, names, query);
  }

  const routeUrl = route[PARAMS.url];
  if (routeUrl && testValidUrl(routeUrl)) {
    return openUrl(routeUrl, names);
  }

  if (testValidUrl(route)) {
    if (urlHasQueryParam(route) && query) {
      return openSearchUrl(route, names, query);
    }

    return openUrl(route, names);
  }

  throw generateMessage(STATUS.NOT_FOUND, "Url");
};

const openSearchUrl = (url, names, query) => {
  const routeWithQuery = replaceQuery(url, query);
  return openUrl(routeWithQuery, names, query);
};

module.exports = { getConfigFile, getDividedSteps, getStepsUrl, redirectRoute };
