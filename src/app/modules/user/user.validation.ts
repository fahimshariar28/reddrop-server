import { z } from "zod";
import { ROLE, BloodGroup } from "../../enums/userEnum";

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

const outsideDonationSchema = z.object({
  address: z.string().min(1, "Address is required"),
  date: z.date(),
});

// Zod schema for User validation
export const userValidationSchema = z.object({
  username: z.string().min(1, "Username is required").max(50),
  role: z.enum([ROLE.ADMIN, ROLE.USER]).default(ROLE.USER),
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"), // Assuming hashed passwords
  needPasswordReset: z.boolean().default(false),
  oldPasswords: z.array(z.string()).optional(), // Array of hashed passwords
  socialLogin: z.boolean().default(false),
  socialLink: z.array(socialLinkSchema).optional(), // Array of Social login links
  number: z.string().min(10, "Invalid phone number").max(15),
  bloodGroup: z.enum([...Object.values(BloodGroup)] as [string, ...string[]], {
    required_error: "Blood group is required",
  }),
  plasma: z.boolean({ required_error: "Plasma eligibility is required" }),
  permanentAddress: addressSchema,
  presentAddress: addressSchema,
  isActivate: z.boolean().default(true),
  userBadges: z.array(z.string()).optional(), // Array of Badge ObjectIds (as strings), can be optional during creation
  requestRequested: z.array(z.string()).optional(), // Array of Request ObjectIds
  requestReceived: z.array(z.string()).optional(), // Array of Request ObjectIds
  donated: z.array(z.string()).optional(), // Array of Donation History ObjectIds
  donationReceived: z.array(z.string()).optional(), // Array of Donation History ObjectIds
  outsideDonation: z.array(outsideDonationSchema).optional(), // Date of last donation only for new users to track the last donation date
  referrer: z.string().optional(), // Optional referrer (username)
  refereed: z.array(z.string()).optional(), // Referrer User
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  isDeleted: z.boolean().default(false), // Default value for deletion status
});

// Export default validation schema
export default userValidationSchema;
