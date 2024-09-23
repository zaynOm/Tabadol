import express from "express";
import { googleAuth, signIn, signUp } from "../controllers/authController";

const router = express.Router();

// router.get("/auth/google", googleLogin);
router.post("/auth/google", googleAuth);
router.post("/auth/signup", signUp);
router.post("/auth/login", signIn);

export default router;
