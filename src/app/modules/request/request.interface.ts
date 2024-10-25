import { BloodGroup } from "../../enums/userEnum";
import { RequestStatus } from "../../enums/requestEnum";

type IRequestLocation = {
  division: string;
  district: string;
  upazila: string;
  hospital: string;
};

export type IRequestStatus = {
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
  location: IRequestLocation;
  patientProblem: string;
  requestStatus: IRequestStatus[];
  // requestExpiresAt?: Date;
};
