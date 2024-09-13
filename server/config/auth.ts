import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

dotenv.config();

export const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CALLBACK_URL,
);

// export const verifyGoogleToken = async (token: string) => {
//   try {
//     const link = oauth2Client.generateAuthUrl({
//       access_type: "offline",
//       scope: ["profile", "email"],
//     });
//     console.log(link);
//     const r = await oauth2Client.getToken(token);
//     const idToken = r.tokens.id_token;
//     console.log("inside auth verifyGoogleToken ", r, idToken);
//     const ticket = await oauth2Client.verifyIdToken({
//       idToken: idToken!,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });
//     console.log("Ticket:", ticket);
//     const payload = ticket.getPayload();
//     return payload;
//   } catch (err) {
//     throw new Error("Invalid Google token" + err);
//   }
// };
