import { Schema, model, Document } from "mongoose";
import { IDistrict } from "./district.interface";

const DistrictSchema = new Schema<IDistrict & Document>({
  name: {
    type: String,
    required: true,
  },
  division: {
    type: Schema.Types.ObjectId,
    ref: "Division",
    required: true,
  },
});

export const DistrictModel = model<IDistrict & Document>(
  "District",
  DistrictSchema
);
