import { BloodGroup } from "../../enums/userEnum";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponseMessage from "../../utils/sendResponse";
import { IDonation } from "./donation.interface";
import { DonationService } from "./donation.service";
import { DonationValidationSchema } from "./donation.validation";

// Create a new Donation
const createDonation = catchAsyncFunc(async (req, res) => {
  const donationValidation = DonationValidationSchema.parse({
    ...req.body,
    bloodGroup: req.body.bloodGroup as keyof typeof BloodGroup,
  });

  const donation = await DonationService.createDonation(
    donationValidation as unknown as IDonation
  );

  sendResponseMessage(res, {
    success: true,
    statusCode: 201,
    message: "Request created successfully",
    data: donation,
  });
});

// Get all donations
const getAllDonations = catchAsyncFunc(async (req, res) => {
  const donation = await DonationService.getAllDonations();

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "Requests fetched successfully",
    data: donation,
  });
});

// Get donations by user ID
const getDonationsByUserId = catchAsyncFunc(async (req, res) => {
  const id = req.user.id;

  const donation = await DonationService.getDonationsByUserId(id);

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "Requests fetched successfully",
    data: donation,
  });
});

// Get donation by ID
const getDonationById = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;

  const donation = await DonationService.getDonationById(id);

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "Requests fetched successfully",
    data: donation,
  });
});

export const DonationController = {
  createDonation,
  getAllDonations,
  getDonationsByUserId,
  getDonationById,
};
