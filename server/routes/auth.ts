import express from "express";
import { googleCallback, googleLogin } from "../controllers/authController";

const router = express.Router();

router.get("/auth/google", googleLogin);
router.get("/auth/google/callback", googleCallback);

export default router;
