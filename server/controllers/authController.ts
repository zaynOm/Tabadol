import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { oauth2Client } from "../config/auth";
import User from "../models/user";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import CustomError from "../utils/customError";
import { generateAccessToken, generateRefreshToken } from "../utils/jwtTokens";

export const googleAuth = asyncErrorHandler(async (req: Request, res: Response) => {
  const { idToken } = req.body;

  const ticket = await oauth2Client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();

  const userData = {
    googleId: payload?.sub as string,
    email: payload?.email as string,
    name: payload?.name as string,
    picture: payload?.picture as string,
  };

  let user = await User.findOne({ email: userData.email });
  if (!user) {
    user = await User.create(userData);
  }

  const access_token = generateAccessToken(user._id);
  const refresh_token = generateRefreshToken(user._id);

  res.json({
    success: true,
    data: {
      access_token,
      refresh_token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        location: user.location,
      },
    },
  });
});

export const signUp = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return next(new CustomError("Email already exists", 409));
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({ name, email, password: hashedPassword });

  console.log(user);

  const access_token = generateAccessToken(user._id);
  const refresh_token = generateRefreshToken(user._id);

  res.json({
    success: true,
    data: {
      access_token,
      refresh_token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        location: user.location,
      },
    },
  });
});

export const signIn = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new CustomError("User not found", 404));
  }

  const isMatch = await bcrypt.compare(password, user.password!);
  if (!isMatch) {
    return next(new CustomError("Wrong password", 400));
  }

  const access_token = generateAccessToken(user._id);
  const refresh_token = generateRefreshToken(user._id);

  res.json({
    success: true,
    data: {
      access_token,
      refresh_token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        location: user.location,
      },
    },
  });
});
