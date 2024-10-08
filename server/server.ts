import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import demandRouter from "./routes/demandRoutes";
import geoRouter from "./routes/geoRoutes";
import userRouter from "./routes/userRoutes";
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
app.use("/api/v1", userRouter);

app.all("*", (req, _res, next) => {
  const err = new CustomError(`${req.originalUrl} route not found`, 404);
  next(err);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  if (process.env.NODE_ENV === "dev") {
    console.log(err);
  }
  err.status = err.status || 500;
  res.status(err.status).json({
    success: false,
    status: err.status,
    message: err.message.replace(/"/g, "'"),
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server listening on port 5000");
});
