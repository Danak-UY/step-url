const {
  JOIN_PARAM,
  SEPARATOR_PARAM,
  QUERY_SEPARATOR,
  STATUS,
} = require("./constants");

const joinSteps = (steps) => steps?.join(JOIN_PARAM);

const generateMessage = (status, type, steps = [], query = "") => {
  let message = `${status} - ${type}`;

  if (status === STATUS.OK) {
    message = type;
  }

  if (Array.isArray(steps)) {
    message += SEPARATOR_PARAM + joinSteps(steps);
  }

  if (query) {
    message += QUERY_SEPARATOR + query;
  }

  return message;
};

const showMessage = (message) => console.log(message);

module.exports = {
  generateMessage,
  showMessage,
};
