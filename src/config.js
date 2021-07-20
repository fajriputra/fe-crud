const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  apiHost: process.env.REACT_APP_HOST,
};
