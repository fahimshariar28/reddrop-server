import { Types } from "mongoose";

export type IUpazila = {
  _id?: Types.ObjectId;
  name: string;
};

export type IDistrict = {
  _id?: Types.ObjectId;
  name: string;
  upazilas: IUpazila[];
};

export type IDivision = {
  _id?: Types.ObjectId;
  name: string;
  districts: IDistrict[];
};
