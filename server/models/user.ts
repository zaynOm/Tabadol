import mongoose from "mongoose";

export type TUser = {
  googleId: string;
  name: string;
  email: string;
  picture: string;
};

const userSchema = new mongoose.Schema<TUser>(
  {
    googleId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    picture: String,
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
