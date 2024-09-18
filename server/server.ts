import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import geoRouter from "./routes/geoRoutes";
import demandRouter from "./routes/demandRoutes";
import CustomError from "./utils/customError";

dotenv.config({
  path: process.env.NODE_ENV === "prod" ? ".env.prod" : ".env",
});

connectDB();

const app = express();

app.use(express.json());

app.use("/api/v1", authRoutes);
app.use("/api/v1", geoRouter);
app.use("/api/v1", demandRouter);

app.all("*", (req, _res, next) => {
  const err = new CustomError(`${req.originalUrl} route not found`, 404);
  next(err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server listening on port 5000");
});
