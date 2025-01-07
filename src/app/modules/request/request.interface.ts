import { BloodGroup } from "../../enums/userEnum";
import { RequestStatus } from "../../enums/requestEnum";
import { ObjectId } from "mongoose";

export type IRequestStatus = {
  status: (typeof RequestStatus)[keyof typeof RequestStatus];
  time: Date;
  reason?: string;
};

export type IRequest = {
  receiver: ObjectId;
  donor: ObjectId;
  bloodGroup: (typeof BloodGroup)[keyof typeof BloodGroup];
  plasma: boolean;
  // isEmergency: boolean;
  hospital: string;
  patientProblem: string;
  requestStatus: IRequestStatus[];
  time: Date;
  // requestExpiresAt?: Date;
};
