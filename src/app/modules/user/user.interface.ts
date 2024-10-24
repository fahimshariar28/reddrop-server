import { Types } from "mongoose";
import { ROLE, STATUS, BloodGroup } from "./user.constant";

// Interface for Address object
type Address = {
  division: string;
  district: string;
  upazila: string;
  homeAddress: string;
};
type ISocialLink = {
  provider: string;
  id?: string;
};

// User interface
export type IUser = {
  _id?: string; // MongoDB ObjectId as string
  username: string;
  role: (typeof ROLE)[keyof typeof ROLE];
  name: string;
  email: string;
  password: string; // Should be a hashed password
  needPasswordReset: boolean;
  oldPasswords?: string[]; // Array of hashed passwords
  socialLogin: boolean;
  socialLink?: ISocialLink[]; // Array of objects of Social login link
  number: string;
  bloodGroup: (typeof BloodGroup)[keyof typeof BloodGroup];
  plasma: boolean;
  permanentAddress: Address;
  presentAddress: Address;
  availability: (typeof STATUS)[keyof typeof STATUS];
  userBadges: Types.ObjectId[]; // Array of Badge ObjectIds
  donationHistory: Types.ObjectId[]; // Array of Donation History ObjectIds
  referrer?: string; // Username of the referrer
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted: boolean;
};
