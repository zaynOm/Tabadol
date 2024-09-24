import { Types } from "mongoose";

export type Location = {
  academy: Types.ObjectId;
  province: Types.ObjectId;
  commune: Types.ObjectId | Types.ObjectId[];
  school: string;
};

export type LocationPopulated = {
  academy: { id: Types.ObjectId; name: string };
  province: { id: Types.ObjectId; name: string };
  commune: { id: Types.ObjectId; name: string };
  school: { id: Types.ObjectId; name: string };
};

export type Demand = {
  userId: Types.ObjectId;
  post: string;
  speciality: string;
  currentLocation: Location;
  desiredLocation: Location;
  status: "open" | "closed" | "matched";
};

export type DemandPopulated = Omit<
  Demand,
  "currentLocation" | "desiredLocation"
> & {
  currentLocation: LocationPopulated;
  desiredLocation: LocationPopulated;
};
