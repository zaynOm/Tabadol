import csvParser from "csv-parser";
import { createReadStream } from "fs";
import connectDB from "./config/db";
import Academy from "./models/academy";
import Commune from "./models/commune";
import Province from "./models/province";

type Tdata = {
  region: string;
  province: string;
  commune: string;
};

(async () => {
  await connectDB();
  const results: Tdata[] = [];
  createReadStream("final_data.csv")
    .pipe(csvParser())
    .on("data", async (data) => results.push(data))
    .on("error", (err) => {
      console.log(err);
    })
    .on("end", async () => {
      for (const data of results) {
        let academy = await Academy.findOne({ name: data.region });
        if (!academy) {
          academy = await Academy.create({ name: data.region });
          console.log(academy.name);
        }

        let province = await Province.findOne({
          name: data.province,
          academyId: academy._id,
        });
        if (!province) {
          province = await Province.create({
            name: data.province,
            academyId: academy._id,
          });
          academy.provinces.push(province._id);
          await academy.save();
        }

        let commune = await Commune.findOne({
          name: data.commune,
          provinceId: province._id,
        });
        if (!commune) {
          commune = await Commune.create({
            name: data.commune,
            provinceId: province._id,
          });
          province.communes.push(commune._id);
          await province.save();
        }
      }
      console.log("CSV file successfully processed");
    });
})();
