import { Schema, model, Document } from "mongoose";
import { IRequest } from "./request.interface";
import { RequestStatus } from "../../enums/requestEnum";
import { BloodGroup } from "../../enums/userEnum";

// Mongoose Schema for Address
const addressSchema = new Schema({
  division: { type: String, required: true },
  district: { type: String, required: true },
  upazila: { type: String, required: true },
  hospital: { type: String, required: true },
});

// Mongoose Schema for Status

const statusSchema = new Schema({
  // enum of RequestStatus
  status: {
    type: String,
    enum: [...Object.values(RequestStatus)],
    required: true,
  },
  time: { type: Date, required: true },
  reason: { type: String, required: false },
});

// Mongoose Schema for Request
const requestSchema = new Schema({
  receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  donorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  bloodGroup: {
    type: String,
    enum: [...Object.values(BloodGroup)],
    required: true,
  },
  plasma: { type: Boolean, required: true },
  isEmergency: { type: Boolean, required: true },
  location: { type: addressSchema, required: true },
  patientProblem: { type: String, required: true },
  requestStatus: { type: [statusSchema], required: true },
  time: { type: Date, required: true },
  // requestExpiresAt: { type: Date, required: false },
});

const RequestModel = model<IRequest & Document>("Request", requestSchema);

export default RequestModel;
