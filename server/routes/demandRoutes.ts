import express from "express";
import { createExchangeDemand, getExchangeDemands } from "../controllers/exchangeController";
import { isAuthenticated } from "../middleware/auth";

const router = express.Router();

router.post("/demands", isAuthenticated, createExchangeDemand);
router.get("/demands", getExchangeDemands);

export default router;
