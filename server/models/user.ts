import { Location } from "@/types/demand";
import mongoose from "mongoose";
import { locationSchema } from "./exchangeDemand";

export type TUser = {
  googleId?: string;
  name: string;
  email: string;
  picture?: string;
  password?: string;
  post: string;
  speciality: string;
  location?: Location | null;
};

const userSchema = new mongoose.Schema<TUser>(
  {
    googleId: { type: String, sparse: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    picture: { type: String, default: null },
    post: { type: String, default: null },
    speciality: { type: String, default: "sans" },
    location: { type: locationSchema, default: null },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.location === undefined) {
    this.location = null;
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
