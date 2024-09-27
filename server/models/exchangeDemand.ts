import { Demand, Location } from "@/types/demand";
import { model, Schema } from "mongoose";

export const locationSchema = new Schema<Location>(
  {
    academy: { type: Schema.Types.ObjectId, ref: "Academy", required: true, default: null },
    province: { type: Schema.Types.ObjectId, ref: "Province", required: true, default: null },
    commune: { type: Schema.Types.ObjectId, ref: "Commune", required: true, default: null },
    school: { type: String, required: true },
  },
  { _id: false }
);

const exchangeDemandSchema = new Schema<Demand>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
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
