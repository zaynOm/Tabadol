import "dotenv/config";
import express from "express";
import session from "express-session";
import connectDB from "./config/db";
import authRoutes from "./routes/auth";
import geoRouter from "./routes/geo";

connectDB();

const app = express();

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "SESSION_SECRET",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(authRoutes);
app.use(geoRouter);

app.get("/", (req, res) => {
  res.send("Hello word!!!!!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server listening on port 5000");
});
