import { Schema } from "mongoose";

export type IDistrict = {
  name: string;
  division: Schema.Types.ObjectId;
};
