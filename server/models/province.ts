import { model, Schema, Types } from "mongoose";

type TProvince = {
  name: string;
  academyId: Types.ObjectId;
  communes: Types.ObjectId[];
};

const provinceSchema = new Schema<TProvince>({
  name: { type: String, required: true, unique: true },
  academyId: { type: Schema.Types.ObjectId, ref: "Academy", required: true },
  communes: [{ type: Schema.Types.ObjectId, ref: "Commune" }],
});

const Province = model<TProvince>("Province", provinceSchema);

export default Province;
