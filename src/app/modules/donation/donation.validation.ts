import { z } from "zod";
import { BloodGroup } from "../../enums/userEnum";

const donationAddressSchema = z.object({
  division: z.string(),
  district: z.string(),
  upazila: z.string(),
  hospital: z.string(),
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
  feedback: z.string(),
});
