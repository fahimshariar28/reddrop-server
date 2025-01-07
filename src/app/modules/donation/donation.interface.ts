import { BloodGroup } from "../../enums/userEnum";
import { donationStatus } from "../../enums/donationEnum";
import { ObjectId } from "mongoose";

export type IDonationStatus = {
  status: (typeof donationStatus)[keyof typeof donationStatus];
  reason?: string;
  time: Date;
};

export type IDonation = {
  donor: ObjectId;
  receiver: ObjectId;
  patientProblem: string;
  hospital: string;
  // isEmergency: boolean;
  bloodGroup: (typeof BloodGroup)[keyof typeof BloodGroup];
  plasma: boolean;
  time?: Date;
  donationStatus: IDonationStatus[];
  feedback?: ObjectId;
};
