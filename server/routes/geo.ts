import express from "express";
import {
  getAcademies,
  getAcademy,
  getProvincesAndCommunesByAcademyId,
} from "../controllers/geoController";

const router = express.Router();

router.get("/academies", getAcademies);
router.get("/academies/:academyId", getAcademy);
router.get("/academies/:academyId/provinces", getProvincesAndCommunesByAcademyId);

export default router;
