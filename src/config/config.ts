const dotenv = require("dotenv");

dotenv.config();

/** Server config */
const SERVER_PORT = process.env.SERVER_PORT || 9000;

const DATABASE_SERVER = process.env.DATABASE_SERVER;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_PORT = process.env.DATABASE_PORT;
const DATABASE_URL = process.env.DATABASE_URL;

export default {
  server: {
    SERVER_PORT,
  },
  database: {},
};
