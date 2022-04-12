const { getArgs, validateArgs } = require("./utils");
const { showMessage } = require("./logs");

const {
  getConfigFile,
  getDividedSteps,
  getStepsUrl,
  redirectRoute,
} = require("./controller");

(async () => {
  try {
    const [steps, query] = getArgs();
    validateArgs(steps, query);

    const {
      $routes,
      $combos,
      $configs: { $dividers, $wildcard, $comboWildcard },
    } = await getConfigFile();
    global.wildcard = $wildcard;

    const dividedSteps = getDividedSteps(steps, $dividers);
    const [firstStep] = dividedSteps;

    if (firstStep === $comboWildcard) {
      const [, ...comboSteps] = dividedSteps;

      const [routes] = getStepsUrl($combos, comboSteps);

      const urls = routes.map((r) => {
        const dividedSteps = getDividedSteps(r, $dividers);
        return getStepsUrl($routes, dividedSteps);
      });

      urls.map(([route, names]) => {
        redirectRoute(route, names);
      });

      return;
    }

    const [route, names] = getStepsUrl($routes, dividedSteps);

    redirectRoute(route, names, query);
  } catch (err) {
    showMessage(err);
  }
})();
