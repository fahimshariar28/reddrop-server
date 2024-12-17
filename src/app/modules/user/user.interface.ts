import { Types } from "mongoose";
import { ROLE, BloodGroup } from "../../enums/userEnum";

// Interface for Address object
type Address = {
  division: string;
  district: string;
  upazila: string;
  homeAddress: string;
};

type IOutsideDonation = {
  address: string;
  date: Date;
};

export type IFilters = {
  bloodGroup?: string;
  division?: string;
  district?: string;
  upazila?: string;
  plasma?: boolean;
};

// User interface
export type IUser = {
  _id?: string; // MongoDB ObjectId as string
  username: string;
  role: (typeof ROLE)[keyof typeof ROLE];
  name: string;
  email: string;
  profilePicture?: string;
  password: string; // Should be a hashed password
  needPasswordReset: boolean;
  oldPasswords?: string[]; // Array of hashed passwords
  number: string;
  bloodGroup: (typeof BloodGroup)[keyof typeof BloodGroup];
  plasma: boolean;
  permanentAddress: Address;
  presentAddress: Address;
  isActive: boolean;
  userBadges: Types.ObjectId[]; // Array of Badge ObjectIds
  requestRequested?: Types.ObjectId[]; // Array of Request ObjectIds
  requestReceived?: Types.ObjectId[]; // Array of Request ObjectIds
  donated?: Types.ObjectId[]; // Array of Donation History ObjectIds
  donationReceived?: Types.ObjectId[]; // Array of Donation History ObjectIds
  outsideDonation?: IOutsideDonation[]; // Date of last donation only for new users to track the last donation date
  reference?: Types.ObjectId; // Referrer User ObjectId
  refereed?: Types.ObjectId[]; // Referrer User ObjectId
  notifications?: Types.ObjectId[]; // Array of Notification ObjectIds
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted: boolean;
};
