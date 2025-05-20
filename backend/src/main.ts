import "reflect-metadata";

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { configs } from "./config/config";
import { AppDataSource } from "./ormconfig";
import { authRouter } from "./routes/authRoutes";
import { vaultRouter } from "./routes/vault.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"], // Масив замість строки
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
      "Cache-Control",
    ],
    exposedHeaders: ["Set-Cookie"],
    optionsSuccessStatus: 200,
  }),
);

app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/", vaultRouter);

AppDataSource.initialize()
  .then(() => {
    console.log(" Connected to PostgreSQL");
    app.listen(configs.PORT, () => {
      console.log(` Server is running on port ${configs.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to the database", err);
  });
