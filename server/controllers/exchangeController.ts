import { NextFunction, Request, Response } from "express";
import ExchangeDemand from "../models/exchangeDemand";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import CustomError from "../utils/customError";

export const createExchangeDemand = asyncErrorHandler(async (req: Request, res: Response) => {
  const data = req.body;

  const demand = await ExchangeDemand.create(data);
  res.json({ success: true, data: demand });
});

export const getExchangeDemands = asyncErrorHandler(async (req: Request, res: Response) => {
  const query = req.query;

  const demands = await ExchangeDemand.find(query)
    .populate({
      path: "userId",
      select: "name post speciality location",
      populate: [
        { path: "location.academy", select: "_id name" },
        { path: "location.province", select: "_id name" },
        { path: "location.commune", select: "_id name" },
      ],
    })
    .populate("desiredLocation.academy", "_id name")
    .populate("desiredLocation.province", "_id name")
    .populate("desiredLocation.commune", "_id name");

  res.json({ success: true, data: demands });
});

export const updateExchangeDemand = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const updatedDemand = await ExchangeDemand.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedDemand) {
      const error = new CustomError("ExchangeDemand not found!", 404);
      return next(error);
    }

    res.json({ success: true, data: updatedDemand });
  },
);
