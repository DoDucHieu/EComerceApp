import express from "express";
import config from "config";
import db from "./src/utils/connect";
import logger from "./src/utils/logger";
import routes from "./src/route";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const PORT = config.get<number>("port");

app.listen(PORT, async () => {
  logger.info(`App is running at http://localhost:${PORT}`);
  await db.connect();

  routes(app);
});
