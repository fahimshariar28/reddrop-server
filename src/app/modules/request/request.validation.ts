import { z } from "zod";
import { RequestStatus } from "../../enums/requestEnum";

export const RequestLocationSchema = z.object({
  division: z.string(),
  district: z.string(),
  upazila: z.string(),
  hospital: z.string(),
});

export const RequestStatusSchema = z.object({
  status: z.enum([
    RequestStatus.PENDING,
    RequestStatus.ACCEPTED,
    RequestStatus.COMPLETED,
    RequestStatus.REJECTED,
    RequestStatus.CANCELLED,
  ]),
  time: z.date(),
  reason: z.string().optional(),
});

export const RequestValidationSchema = z.object({
  receiverId: z.string(),
  donorId: z.string(),
  bloodGroup: z.string(),
  plasma: z.boolean(),
  isEmergency: z.boolean(),
  location: RequestLocationSchema,
  patientProblem: z.string(),
  requestStatus: z.array(RequestStatusSchema),
});
