import { Request, Response } from "express";
import Academy from "../models/academy";

// this is important to use mongoose populate
import Province from "../models/province";
import "../models/commune";

export const getAcademies = async (req: Request, res: Response) => {
  try {
    const academies = await Academy.find({}, "_id name");
    return res.json(academies);
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving academies",
      error: (error as Error).message,
    });
  }
};

export const getAcademy = async (req: Request, res: Response) => {
  const academyId = req.params.academyId;
  try {
    const academy = await Academy.findById(academyId).populate("provinces");
    if (!academy) {
      return res.status(404).json({ message: "Academy not found" });
    }
    return res.json(academy);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error retrieving the academy",
      error: (error as Error).message,
    });
  }
};

export const getProvincesAndCommunesByAcademyId = async (req: Request, res: Response) => {
  const academyId = req.params.academyId;
  try {
    const provincesAndCommunes = await Province.find({ academyId }, "_id name").populate(
      "communes",
      "_id name",
    );
    if (!provincesAndCommunes) {
      return res.status(404).json({ message: "No Provinces where found for the given academyId" });
    }

    return res.json(provincesAndCommunes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error retrieving the provinces",
      error: (error as Error).message,
    });
  }
};
