const { getArgs, validateArgs } = require("./utils");
const { showMessage } = require("./logs");
const { handleStepUrl, handleComboUrl } = require("./main");

const { getConfigFile, getDividedSteps } = require("./controller");

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
      return handleComboUrl($combos, $routes, dividedSteps, $dividers);
    }

    handleStepUrl($routes, dividedSteps, query);
  } catch (err) {
    showMessage(err);
  }
})();
