import { check } from "express-validator";

export const newExchangeDemandValidation = [
  check("userId").trim().notEmpty(),
  check("post").trim().notEmpty(),
  check("speciality").trim().notEmpty(),
  check("currentLocation.*").trim().notEmpty(),
  check("desiredLocation.*").trim().notEmpty(),
  check("status").trim().optional().trim().isString(),
];
