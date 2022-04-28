const open = require("open");
jest.mock("open");

const {
  getArgs,
  validateArgs,
  testValidUrl,
  urlHasQueryParam,
  replaceQuery,
  openUrl,
  parseJsonFile,
} = require("../utils");

describe("getArgs", () => {
  it("should return an array of arguments", () => {
    process.argv = ["node", "src/__test__/utils.test.js", "steps", "query"];
    const [steps, query] = getArgs();

    expect(steps).toBe("steps");
    expect(query).toBe("query");
  });
});

describe("validateArgs", () => {
  it("should not throw error", () => {
    const steps = "se-ggl";
    expect(() => validateArgs(steps)).not.toThrow();
  });

  it("should throw error", () => {
    const steps = "";
    expect(() => validateArgs(steps)).toThrow();
  });
});

describe("testValidUrl", () => {
  it("should return true", () => {
    const url = "http://www.google.com";
    expect(testValidUrl(url)).toBe(true);
  });

  it("should return false", () => {
    const url = "not a url";
    expect(testValidUrl(url)).toBe(false);
  });
});

describe("urlHasQueryParam", () => {
  beforeEach(() => {
    global.wildcard = undefined;
  });

  it("should return true", () => {
    const url = "http://www.google.com/?q=%q";
    global.wildcard = "%q";
    expect(urlHasQueryParam(url)).toBe(true);
  });

  it("should return true with default query param", () => {
    const url = "http://www.google.com/?q=%s";
    expect(urlHasQueryParam(url)).toBe(true);
  });

  it("should return false", () => {
    const url = "http://www.google.com";
    expect(urlHasQueryParam(url)).toBe(false);
  });
});

describe("replaceQuery", () => {
  beforeEach(() => {
    global.wildcard = undefined;
  });

  it("should replace onw wildcard", () => {
    const url = "http://www.google.com/?q=%q";
    const query = "query";
    global.wildcard = "%q";

    expect(replaceQuery(url, query)).toBe("http://www.google.com/?q=query");
  });

  it("should replace multiple wildcards", () => {
    const url = "http://www.google.com/?q=%s&t=%s&c=%s";
    const query = "test";

    expect(replaceQuery(url, query)).toBe(
      "http://www.google.com/?q=test&t=test&c=test"
    );
  });
});

describe("openUrl", () => {
  it("should call open with url", () => {
    const url = "http://www.google.com";
    openUrl(url);
    expect(open).toHaveBeenCalledWith(url);
  });
});

describe("parseJsonFile", () => {
  it("should return parsed json", () => {
    const string = '{"test":[1,2,3]}';
    const json = { test: [1, 2, 3] };

    const jsonParsed = parseJsonFile(string);
    expect(jsonParsed).toStrictEqual(json);
  });

  it("should throw error", () => {
    const string = "{test: 1,2,3}";
    expect(() => parseJsonFile(string)).toThrow();
  });
});
