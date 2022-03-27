const { getArgs, validateArgs } = require("./utils");

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

    console.log("script args ->", steps, query);

    const {
      routes,
      configs: { dividers, wildcard },
    } = await getConfigFile();
    global.wildcard = wildcard;

    const dividedSteps = getDividedSteps(steps, dividers);
    const { route, names } = getStepsUrl(routes, dividedSteps);

    redirectRoute(route, names, query);
  } catch (err) {
    console.log(err);
  }
})();
