import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { oauth2Client } from "../config/auth";
import User, { TUser } from "../models/user";


export const googleAuth = async (req: Request, res: Response) => {
  const { idToken } = req.body;

  try {
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

    return res.json({ token, user });
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "Error retrievin user data", error: (err as Error).message });
  }
};
