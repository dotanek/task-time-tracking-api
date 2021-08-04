import app from "./app";
import config from "./config/config";

/* Server startup */
app.listen(config.server.SERVER_PORT, () =>
  console.log(`Server listening on port ${config.server.SERVER_PORT}...`)
);
