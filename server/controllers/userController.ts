import { NextFunction, Request, Response } from "express";
import ExchangeDemand from "../models/exchangeDemand";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import CustomError from "../utils/customError";

// export const getUser = async (req: Request, res: Response)=>{
//
// }

export const createExchangeDemand = asyncErrorHandler(async (req: Request, res: Response) => {
  const data = req.body;

  const demand = await ExchangeDemand.create(data);
  res.json({ success: true, data: demand });
});

export const getExchangeDemands = asyncErrorHandler(async (req: Request, res: Response) => {
  const query = req.query;

  const demands = await ExchangeDemand.find(query);
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
