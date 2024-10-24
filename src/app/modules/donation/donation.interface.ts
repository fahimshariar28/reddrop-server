import { BloodGroup } from "../../enums/userEnum";

type ILocation = {
  division: string;
  district: string;
  upazila: string;
  hospital: string;
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
  feedback: string; // Feedback id
};
