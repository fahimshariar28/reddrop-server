import { z } from "zod";
import { ROLE, STATUS, BloodGroup } from "./user.constant";

// Zod schema for the Address object
const addressSchema = z.object({
  division: z.string().min(1, "Division is required"),
  district: z.string().min(1, "District is required"),
  upazila: z.string().min(1, "Upazila is required"),
  homeAddress: z.string().optional(), // Optional home address
});

const socialLinkSchema = z.object({
  provider: z.string().min(1, "Provider is required"),
  id: z.string().optional(),
});

// Zod schema for User validation
export const userValidationSchema = z.object({
  username: z.string().min(1, "Username is required").max(50),
  role: z.enum([ROLE.ADMIN, ROLE.USER]).default(ROLE.USER),
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"), // Assuming hashed passwords
  needPasswordReset: z.boolean().default(false),
  socialLogin: z.boolean().default(false),
  socialLink: z.array(socialLinkSchema).optional(), // Array of Social login links
  number: z.string().min(10, "Invalid phone number").max(15),
  bloodGroup: z.enum([...Object.values(BloodGroup)] as [string, ...string[]], {
    required_error: "Blood group is required",
  }),
  plasma: z.boolean({ required_error: "Plasma eligibility is required" }),
  permanentAddress: addressSchema,
  presentAddress: addressSchema,
  availability: z.enum([STATUS.ACTIVE, STATUS.UNAVAILABLE], {
    required_error: "Availability status is required",
  }),
  userBadges: z.array(z.string()).optional(), // Array of Badge ObjectIds (as strings), can be optional during creation
  donationHistory: z.array(z.string()).optional(), // Array of Donation History ObjectIds (as strings), can be optional during creation
  referrer: z.string().optional(), // Optional referrer (username)
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  isDeleted: z.boolean().default(false), // Default value for deletion status
});

// Export default validation schema
export default userValidationSchema;
