import express from "express";
import {
  getAcademies,
  getAcademyWithProvinces,
  getProvincesAndCommunesByAcademyId,
} from "../controllers/geoController";
import { isAuthenticated } from "../middleware/auth";

const router = express.Router();

router.get("/academies", isAuthenticated, getAcademies);
router.get("/academies/:academyId", getAcademyWithProvinces);
router.get("/academies/:academyId/provinces", getProvincesAndCommunesByAcademyId);

export default router;
