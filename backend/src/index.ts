import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import helmet from "helmet";

import router from "./router";

import "./config/db";

const app = express();
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  console.log(`App listening on ${process.env.DOMAIN}:${PORT}`)
);
