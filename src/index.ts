import "dotenv/config";
import express, { Request, Response } from "express";
import nunjucks from "nunjucks";
import cors from "cors";
import { logger } from "./middleware/loggerMiddleware";
import indexRouter from "./routes/indexRouter";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(logger);

nunjucks.configure("src/templates", {
  autoescape: true,
  express: app,
});

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
