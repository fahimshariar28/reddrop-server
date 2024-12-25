import { BloodGroup } from "../../enums/userEnum";
import { RequestStatus } from "../../enums/requestEnum";
import { ObjectId } from "mongoose";

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
  receiverId: ObjectId;
  donorId: ObjectId;
  bloodGroup: (typeof BloodGroup)[keyof typeof BloodGroup];
  plasma: boolean;
  isEmergency: boolean;
  location: IRequestLocation;
  patientProblem: string;
  requestStatus: IRequestStatus[];
  time: Date;
  // requestExpiresAt?: Date;
};
