import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import authRoutes from "./routes/auth";

dotenv.config();

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

app.get("/", (req, res) => {
  res.send("Hello word!!!!!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server listening on port 5000");
});
