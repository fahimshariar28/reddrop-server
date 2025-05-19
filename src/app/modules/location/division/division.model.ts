import { Schema, model, Document } from "mongoose";
import { IDivision } from "./division.interface";

const DivisionSchema = new Schema<IDivision & Document>({
  name: {
    type: String,
    required: true,
  },
});

export const DivisionModel = model<IDivision & Document>(
  "Division",
  DivisionSchema
);
