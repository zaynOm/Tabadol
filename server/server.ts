import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import geoRouter from "./routes/geoRoutes";
import demandRouter from "./routes/demandRoutes";

dotenv.config({
  path: process.env.NODE_ENV === "prod" ? ".env.prod" : ".env",
});

connectDB();

const app = express();

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", geoRouter);
app.use("/api", demandRouter);

app.get("/", (req, res) => {
  res.send("Hello word!!!!!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server listening on port 5000");
});
