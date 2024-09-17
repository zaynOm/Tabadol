import express from "express";
import { isAuthenticated } from "../middleware/auth";
import { createExchangeDemand, getExchangeDemands } from "../controllers/userController";

const router = express.Router();

router.post("/demands", isAuthenticated, createExchangeDemand);
router.get("/demands", isAuthenticated, getExchangeDemands);

export default router;
