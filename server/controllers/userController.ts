import { Request, Response } from "express";
import ExchangeDemand from "../models/exchangeDemand";

// export const getUser = async (req: Request, res: Response)=>{
//
// }

export const createExchangeDemand = async (req: Request, res: Response) => {
  const data = req.body;
  console.log(data);

  try {
    const demand = await ExchangeDemand.create(data);
    return res.json({ message: "Exchange demand created successfuly", demand });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error while creating exchange demand", error: (error as Error).message });
  }
};

export const getExchangeDemands = async (req: Request, res: Response) => {
  const query = req.query;
  console.log(query);

  try {
    const demands = await ExchangeDemand.find(query);
    return res.json(demands);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error while retreving exchange demands", error: (error as Error).message });
  }
};
