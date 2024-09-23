import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import CustomError from "../utils/customError";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err || !decoded) {
      next(new CustomError("unauthorized", 401));
    }
    // req.user = decoded;
    next();
  });
};
