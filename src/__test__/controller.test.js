const open = require("open");
jest.mock("open");

const {
  getDividedSteps,
  getStepsUrl,
  redirectRoute,
} = require("../controller");

const { $configs, $combos, $routes } = require("./step-url.config.mock.json");

describe("getDividedSteps", () => {
  it("should get proper steps", () => {
    const steps = "a b c";

    const stepsArr = getDividedSteps(steps, $configs.$dividers);
    expect(stepsArr).toStrictEqual(["a", "b", "c"]);
  });

  it("should get proper steps when multiple dividers together", () => {
    const steps = "a -b..c";

    const stepsArr = getDividedSteps(steps, $configs.$dividers);
    expect(stepsArr).toStrictEqual(["a", "b", "c"]);
  });

  it("should divide steps with multiple dividers", () => {
    const steps = "a.b:c/d-e_f|g+h";

    const stepsArr = getDividedSteps(steps, $configs.$dividers);
    expect(stepsArr).toStrictEqual(["a", "b", "c", "d", "e", "f", "g", "h"]);
  });
});

describe("getStepsUrl", () => {
  it("should get steps final url", () => {
    const dividedSteps = ["se", "ddg"];
    const expextedUrl = $routes.se.ddg;

    const urlToRedirect = getStepsUrl($routes, dividedSteps);
    expect(urlToRedirect).toStrictEqual([expextedUrl, [$routes.se._name]]);
  });

  it("should get _url step property", () => {
    const dividedSteps = ["se"];

    const urlToRedirect = getStepsUrl($routes, dividedSteps);
    expect(urlToRedirect).toStrictEqual([$routes.se, [$routes.se._name]]);
  });

  it("should get _search step with query", () => {
    const dividedSteps = ["se"];

    const urlToRedirect = getStepsUrl($routes, dividedSteps);
    expect(urlToRedirect).toStrictEqual([$routes.se, [$routes.se._name]]);
  });
});

describe("redirectRoute", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should open simple url", () => {
    const route = $routes.se.ddg;

    redirectRoute(route);
    expect(open).toHaveBeenCalledWith(route);
  });

  it("should open _url", () => {
    const route = $routes.se;

    redirectRoute(route);
    expect(open).toHaveBeenCalledWith($routes.se._url);
  });

  it("should open _search with query", () => {
    const route = $routes.se;
    const query = "test";
    const searchUrl = $routes.se._search;
    const expextedUrl = searchUrl.replaceAll($configs.$wildcard, query);

    redirectRoute(route, "", query);
    expect(open).toHaveBeenCalledWith(expextedUrl);
  });
});
