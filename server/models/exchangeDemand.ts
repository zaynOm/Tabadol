import { model, Schema, Types } from "mongoose";

type TLocation = {
  academy: Types.ObjectId;
  province: Types.ObjectId;
  commune: Types.ObjectId;
  school: string;
};

type TDemand = {
  userId: Types.ObjectId;
  post: string;
  speciality: string;
  currentLocation: TLocation;
  desiredLocation: TLocation;
  status: "open" | "closed" | "matched";
};

const exchangeDemandSchema = new Schema<TDemand>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: String, required: true },
    speciality: { type: String, required: true, default: "sans" },
    currentLocation: {
      academy: { type: Schema.Types.ObjectId, ref: "Academy", required: true },
      province: { type: Schema.Types.ObjectId, ref: "Province", required: true },
      commune: { type: Schema.Types.ObjectId, ref: "Commune", required: true },
      school: { type: String, required: true },
    },
    desiredLocation: {
      academy: { type: Schema.Types.ObjectId, ref: "Academy", required: true },
      province: { type: Schema.Types.ObjectId, ref: "Province", required: true },
      commune: { type: Schema.Types.ObjectId, ref: "Commune", required: true },
      school: { type: String, required: true },
    },
    status: { type: String, enum: ["open", "closed", "matched"], default: "open" },
  },
  { timestamps: true },
);

const ExchangeDemand = model("ExchangeDemand", exchangeDemandSchema);

export default ExchangeDemand;
