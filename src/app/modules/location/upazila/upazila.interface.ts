import { Schema } from "mongoose";

export type IUpazila = {
  name: string;
  district: Schema.Types.ObjectId;
};
