import { z } from "zod";
import { BloodGroup } from "../../enums/userEnum";
import { donationStatus } from "../../enums/donationEnum";

const donationAddressSchema = z.object({
  division: z.string(),
  district: z.string(),
  upazila: z.string(),
  hospital: z.string(),
});

const donationStatusSchema = z.object({
  status: z.enum([...Object.values(donationStatus)] as [string, ...string[]]),
  reason: z.string().optional(),
  time: z.date(),
});

export const DonationValidationSchema = z.object({
  donorId: z.string(),
  receiverId: z.string(),
  donatedAt: z.date(),
  patientProblem: z.string(),
  location: donationAddressSchema,
  isEmergency: z.boolean(),
  bloodGroup: z.enum([...Object.values(BloodGroup)] as [string, ...string[]]),
  plasma: z.boolean(),
  donationTime: z.date(),
  donationStatus: z.array(donationStatusSchema),
  feedback: z.string(),
});
