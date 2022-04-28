const path = require("path");
const fsPromises = require("fs/promises");
const open = require("open");

const { CONFIG_PATH, QUERY_PARAM, URL_REGEX, STATUS } = require("./constants");

const { generateMessage, showMessage } = require("./logs");

const getArgs = () => {
  return process.argv.slice(2);
};

const validateArgs = (steps) => {
  if (!steps) {
    throw generateMessage(STATUS.MISSING, "Arguments");
  }
};

const testValidUrl = (url) => URL_REGEX.test(url);

const urlHasQueryParam = (url) => url.includes(global.wildcard || QUERY_PARAM);

const replaceQuery = (url, query) =>
  url.replaceAll(global.wildcard || QUERY_PARAM, query);

const escapeRegExp = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const openUrl = (url, names, query = "") => {
  const type = query ? "Searching" : "Opening";
  showMessage(generateMessage(STATUS.OK, type, names, query));
  open(url);
};

const resolvePath = () => {
  try {
    return path.resolve(__dirname, CONFIG_PATH);
  } catch {
    throw generateMessage(STATUS.ERROR, "Config path");
  }
};

const readFile = (filePath) => {
  return fsPromises.readFile(filePath).catch(() => {
    throw generateMessage(STATUS.ERROR, "Config file");
  });
};

const parseJsonFile = (file) => {
  try {
    return JSON.parse(file);
  } catch {
    throw generateMessage(STATUS.ERROR, "JSON parse");
  }
};

module.exports = {
  getArgs,
  validateArgs,
  testValidUrl,
  urlHasQueryParam,
  replaceQuery,
  escapeRegExp,
  openUrl,
  resolvePath,
  readFile,
  parseJsonFile,
};
