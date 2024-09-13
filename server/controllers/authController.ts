import { Request, Response } from "express";
import { oauth2Client } from "../config/auth";

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["profile", "email"],
    });
    return res.json({ url });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Login failed", error: (error as Error).message });
  }
};

export const googleCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string;

  try {
    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens) {
      return res.status(500).send("Error exchanging code for token");
    }
    // oauth2Client.setCredentials(tokens);
    const ticket = await oauth2Client.verifyIdToken({
      idToken: tokens.id_token as string,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userData = {
      googleId: payload?.sub,
      email: payload?.email,
      name: payload?.name,
      picture: payload?.picture,
    };

    return res.json({ userData, tokens });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Error retrievin user data" });
  }
};
