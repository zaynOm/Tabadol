import { NextFunction, Request, Response } from "express";
import Academy from "../models/academy";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import CustomError from "../utils/customError";
import Province from "../models/province";

// this is important to use mongoose populate
import "../models/commune";

export const getAcademies = asyncErrorHandler(async (req: Request, res: Response) => {
  const academies = await Academy.find({}, "_id name");
  return res.json({ success: true, academies });
});

export const getAcademy = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const academyId = req.params.academyId;

    const academy = await Academy.findById(academyId).populate("provinces");
    if (!academy) {
      const error = new CustomError("Academy not found!", 404);
      return next(error);
    }
    res.json({ success: true, academy });
  },
);

export const getProvincesAndCommunesByAcademyId = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const academyId = req.params.academyId;

    const provincesAndCommunes = await Province.find({ academyId }, "_id name").populate(
      "communes",
      "_id name",
    );
    if (!provincesAndCommunes) {
      const error = new CustomError("No Provinces where found for the given academyId!", 404);
      return next(error);
    }

    return res.json({ success: true, provincesAndCommunes });
  },
);
