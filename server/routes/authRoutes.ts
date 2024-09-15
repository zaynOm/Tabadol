import express from "express";
import { googleAuth } from "../controllers/authController";

const router = express.Router();

// router.get("/auth/google", googleLogin);
router.post("/auth/google", googleAuth);

export default router;
