import { Demand, Location } from "@/types/demand";
import { model, Schema } from "mongoose";

const locationSchema = new Schema<Location>(
  {
    academy: { type: Schema.Types.ObjectId, ref: "Academy", required: true },
    province: { type: Schema.Types.ObjectId, ref: "Province", required: true },
    commune: { type: Schema.Types.ObjectId, ref: "Commune", required: true },
    school: { type: String, required: true },
  },
  { _id: false }
);

const exchangeDemandSchema = new Schema<Demand>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: String, required: true },
    speciality: { type: String, required: true, default: "sans" },
    currentLocation: { type: locationSchema, required: true },
    desiredLocation: {
      type: new Schema<Location>(
        {
          ...locationSchema.obj,
          commune: [{ type: Schema.Types.ObjectId, ref: "Commune" }],
          school: String,
        },
        { _id: false }
      ),
      required: true,
    },
    status: { type: String, enum: ["open", "closed", "matched"], default: "open" },
  },
  { timestamps: true }
);

const ExchangeDemand = model("ExchangeDemand", exchangeDemandSchema);

export default ExchangeDemand;
