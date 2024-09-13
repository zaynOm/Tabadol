import { model, Schema, Types } from "mongoose";

type TCommune = {
  name: string;
  provinceId: Types.ObjectId;
};

const communeSchema = new Schema<TCommune>({
  name: { type: String, required: true },
  provinceId: { type: Schema.Types.ObjectId, ref: "Province", required: true },
});

const Commune = model("Commune", communeSchema);

export default Commune;
