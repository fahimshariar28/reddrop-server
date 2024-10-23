import { Schema, model } from "mongoose";
import { IDivision } from "./location.interface";

const UpazilaSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    _id: true,
  }
);
const DistrictSchema = new Schema(
  {
    name: { type: String, required: true },
    upazilas: [UpazilaSchema],
  },
  {
    _id: true,
  }
);

const DivisionSchema = new Schema(
  {
    name: { type: String, required: true },
    districts: [DistrictSchema],
  },
  {
    _id: true,
  }
);

const LocationModel = model<IDivision>("Location", DivisionSchema);

export default LocationModel;
