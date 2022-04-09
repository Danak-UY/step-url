const { getDividedSteps, getStepsUrl, redirectRoute } = require("./controller");
const { showMessage, generateMessage } = require("./logs");
const { STATUS, PARAMS } = require("./constants");

const handleStepUrl = ($routes, dividedSteps, query) => {
  const [route, names] = getStepsUrl($routes, dividedSteps);

  redirectRoute(route, names, query);
};

const handleComboUrl = ($combos, $routes, dividedSteps, $dividers) => {
  const [, ...comboSteps] = dividedSteps;

  let [routes, comboNames] = getStepsUrl($combos, comboSteps);

  if (!Array.isArray(routes)) {
    routes = routes[PARAMS.routes];
  }

  const urls = routes.map((r) => {
    const dividedSteps = getDividedSteps(r, $dividers);
    return getStepsUrl($routes, dividedSteps);
  });

  urls.map(([route, names]) => {
    redirectRoute(route, names);
  });

  if (comboNames) {
    showMessage(generateMessage(STATUS.OK, "Combo", comboNames));
  }
};

module.exports = { handleStepUrl, handleComboUrl };
