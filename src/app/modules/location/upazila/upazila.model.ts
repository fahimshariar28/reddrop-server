import { Schema, model, Document } from "mongoose";
import { IUpazila } from "./upazila.interface";

const UpazilaSchema = new Schema<IUpazila & Document>({
  name: {
    type: String,
    required: true,
  },
  district: {
    type: Schema.Types.ObjectId,
    ref: "District",
    required: true,
  },
});

export const UpazilaModel = model<IUpazila & Document>(
  "Upazila",
  UpazilaSchema
);
