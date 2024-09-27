import { Request, Response } from "express";
import User from "../models/user";
import asyncErrorHandler from "../utils/asyncErrorHandler";

export const updateUser = asyncErrorHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log("🚀 ~ file: userController.ts:11 ~ body:", req.body);

  const user = await User.findByIdAndUpdate(id, req.body, { new: true });

  res.json({ success: true, data: user });
});
