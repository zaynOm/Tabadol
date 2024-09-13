import { model, Schema, Types } from "mongoose";

type TAcademy = {
  name: string;
  provinces: Types.ObjectId[];
};
const academySchema = new Schema<TAcademy>({
  name: { type: String, required: true, unique: true },
  provinces: [{ type: Schema.Types.ObjectId, ref: "Province" }],
});

const Academy = model("Academy", academySchema);

export default Academy;
