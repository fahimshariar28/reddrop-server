import { BloodGroup } from "../../enums/userEnum";
import { RequestStatus } from "../../enums/requestEnum";

type ILocation = {
  division: string;
  district: string;
  upazila: string;
  hospital: string;
};

type IStatus = {
  status: (typeof RequestStatus)[keyof typeof RequestStatus];
  time: Date;
  reason?: string;
};

export type IRequest = {
  receiverId: string;
  donorId: string;
  bloodGroup: (typeof BloodGroup)[keyof typeof BloodGroup];
  plasma: boolean;
  isEmergency: boolean;
  location: ILocation;
  patientProblem: string;
  status: IStatus[];
  requestExpiresAt: Date;
};
