import { Request, Response } from "express";
import ExchangeDemand from "../models/exchangeDemand";
import asyncErrorHandler from "../utils/asyncErrorHandler";

// export const getUser = async (req: Request, res: Response)=>{
//
// }

export const createExchangeDemand = asyncErrorHandler(async (req: Request, res: Response) => {
  const data = req.body;

  const demand = await ExchangeDemand.create(data);
  return res.json({ success: true, demand });
});

export const getExchangeDemands = asyncErrorHandler(async (req: Request, res: Response) => {
  const query = req.query;

  const demands = await ExchangeDemand.find(query);
  return res.json({ success: true, demands });
});
