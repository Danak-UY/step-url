const path = require("path");
const fsPromises = require("fs/promises");
const open = require("open");

const {
  CONFIG_PATH,
  QUERY_PARAM,
  JOIN_PARAM,
  URL_REGEX,
} = require("./constants");

const getArgs = () => {
  return process.argv.slice(2);
};

const validateArgs = (steps, query) => {
  if (!steps) {
    throw "404 - Arguments";
  }
};

const testValidUrl = (url) => URL_REGEX.test(url);

const urlHasQueryParam = (url) => url.includes(global.wildcard || QUERY_PARAM);

const replaceQuery = (url, query) =>
  url.replace(global.wildcard || QUERY_PARAM, query);

const joinNames = (names) => names?.join(JOIN_PARAM);

const escapeRegExp = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const openUrl = (url, message) => {
  console.log(`"Opening... ${message}"`);
  open(url);
};

const resolvePath = () => {
  try {
    console.log(CONFIG_PATH);
    return path.resolve(__dirname, CONFIG_PATH);
  } catch {
    throw "500 - Config path";
  }
};

const readFile = (filePath) => {
  return fsPromises.readFile(filePath).catch(() => {
    throw "500 - Config file";
  });
};

const parseJsonFile = (file) => {
  try {
    return JSON.parse(file);
  } catch {
    throw "500 - JSON parse";
  }
};

module.exports = {
  getArgs,
  validateArgs,
  testValidUrl,
  urlHasQueryParam,
  replaceQuery,
  joinNames,
  escapeRegExp,
  openUrl,
  resolvePath,
  readFile,
  parseJsonFile,
};
