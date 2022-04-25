const open = require("open");
jest.mock("open");

const { handleStepUrl, handleComboUrl } = require("../main");

const { $configs, $combos, $routes } = require("./step-url.config.mock.json");

describe("handleStepUrl", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should redirect to finished step", () => {
    const dividedSteps = ["se", "ddg"];
    const expextedUrl = $routes.se.ddg;

    handleStepUrl($routes, dividedSteps);
    expect(open).toHaveBeenCalledWith(expextedUrl);
  });

  it("should redirect to _url step", () => {
    const dividedSteps = ["se"];
    const expextedUrl = $routes.se._url;

    handleStepUrl($routes, dividedSteps);
    expect(open).toHaveBeenCalledWith(expextedUrl);
  });

  it("should redirect to _search step with query", () => {
    const dividedSteps = ["se"];
    const query = "test";
    const searchUrl = $routes.se._search;
    const expextedUrl = searchUrl.replaceAll($configs.$wildcard, query);

    handleStepUrl($routes, dividedSteps, query);
    expect(open).toHaveBeenCalledWith(expextedUrl);
  });
});

describe("handleComboUrl", () => {
  it("should redirect to all combo routes", () => {
    const dividedSteps = ["cb", "search"];

    handleComboUrl($combos, $routes, dividedSteps, $configs.$dividers);

    expect(open).toHaveBeenCalledWith($routes.se._url);
    expect(open).toHaveBeenCalledWith($routes.se.ggl);
    expect(open).toHaveBeenCalledWith($routes.se.ddg);
    expect(open).toHaveBeenCalledWith($routes.se.bing);
  });
});
