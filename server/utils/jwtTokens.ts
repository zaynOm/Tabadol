import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const generateAccessToken = (userId: Types.ObjectId) =>
  jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "30m",
  });

export const generateRefreshToken = (userId: Types.ObjectId) =>
  jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "30d",
  });

// export const verifyAccessToken = (token: string) => {
//   try {
//     return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
//   } catch (err) {
//     return err;
//   }
// };
