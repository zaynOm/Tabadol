import { Types } from "mongoose";

export type Location = {
  academy: Types.ObjectId;
  province: Types.ObjectId;
  commune: Types.ObjectId | Types.ObjectId[];
  school: string;
};

export type Demand = {
  userId: Types.ObjectId;
  desiredLocation: Location;
  status: "open" | "closed" | "matched";
};

export type LocationPopulated = {
  academy: { id: Types.ObjectId; name: string };
  province: { id: Types.ObjectId; name: string };
  commune: { id: Types.ObjectId; name: string };
  school: { id: Types.ObjectId; name: string };
};

export type DemandPopulated = Omit<
  Demand,
  "userId" | "currentLocation" | "desiredLocation"
> & {
  userId: {
    id: Types.ObjectId;
    name: string;
    post: string;
    speciality: string;
    location: LocationPopulated;
  };
  currentLocation: LocationPopulated;
  desiredLocation: LocationPopulated;
  createdAt: string;
};
