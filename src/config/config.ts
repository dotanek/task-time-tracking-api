const dotenv = require("dotenv");

dotenv.config();

/** Server config */
const SERVER_PORT = process.env.PORT || 9000;

export default {
  server: {
    SERVER_PORT,
  },
};
