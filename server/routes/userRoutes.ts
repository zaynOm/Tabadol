import express from "express";
import { updateUser } from "../controllers/userController";
import { isAuthenticated } from "../middleware/auth";

const router = express.Router();

router.patch("/users/:id", isAuthenticated, updateUser);

export default router;
