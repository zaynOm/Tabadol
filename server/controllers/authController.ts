import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { oauth2Client } from "../config/auth";
import User, { TUser } from "../models/user";
import asyncErrorHandler from "../utils/asyncErrorHandler";

export const googleAuth = asyncErrorHandler(async (req: Request, res: Response) => {
  const { idToken } = req.body;

  const ticket = await oauth2Client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();

  const userData: TUser = {
    googleId: payload?.sub as string,
    email: payload?.email as string,
    name: payload?.name as string,
    picture: payload?.picture as string,
  };

  let user = await User.findOne({ email: userData.email });
  if (!user) {
    user = await User.create(userData);
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);

  res.json({ success: true, data: { token, user } });
});
