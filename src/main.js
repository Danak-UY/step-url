const { getDividedSteps, getStepsUrl, redirectRoute } = require("./controller");

const handleStepUrl = ($routes, dividedSteps, query) => {
  const [route, names] = getStepsUrl($routes, dividedSteps);

  redirectRoute(route, names, query);
};

const handleComboUrl = ($combos, $routes, dividedSteps, $dividers) => {
  const [, ...comboSteps] = dividedSteps;

  const [routes] = getStepsUrl($combos, comboSteps);

  const urls = routes.map((r) => {
    const dividedSteps = getDividedSteps(r, $dividers);
    return getStepsUrl($routes, dividedSteps);
  });

  urls.map(([route, names]) => {
    redirectRoute(route, names);
  });
};

module.exports = { handleStepUrl, handleComboUrl };
