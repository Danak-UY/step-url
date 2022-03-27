const CONFIG_PATH = "./step-url.config.json";

const QUERY_PARAM = "%s%";
const SPLIT_PARAM = "&";
const JOIN_PARAM = " > ";

const PARAMS = {
  name: "_name",
  url: "_url",
  search: "_search",
};

const URL_REGEX = new RegExp(
  "(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})"
);

module.exports = {
  CONFIG_PATH,
  SPLIT_PARAM,
  QUERY_PARAM,
  JOIN_PARAM,
  PARAMS,
  URL_REGEX,
};
