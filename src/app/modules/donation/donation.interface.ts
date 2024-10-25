import { BloodGroup } from "../../enums/userEnum";
import { donationStatus } from "../../enums/donationEnum";

type ILocation = {
  division: string;
  district: string;
  upazila: string;
  hospital: string;
};

export type IDonationStatus = {
  status: (typeof donationStatus)[keyof typeof donationStatus];
  reason?: string;
  time: Date;
};

export type IDonation = {
  donorId: string;
  receiverId: string;
  donatedAt: Date;
  patientProblem: string;
  location: ILocation;
  isEmergency: boolean;
  bloodGroup: (typeof BloodGroup)[keyof typeof BloodGroup];
  plasma: boolean;
  donationTime: Date;
  donationStatus: IDonationStatus[];
  feedback: string; // Feedback id
};
