import { ObjectId } from "mongoose";
import UserModel from "../user/user.model";
import { IDonation, IDonationStatus } from "./donation.interface";
import DonationModel from "./donation.model";

// Create Donation
const createDonation = async (donationData: IDonation) => {
  const donation = new DonationModel(donationData);
  const data = await donation.save();

  // add the donation to the user's donated list
  await UserModel.findByIdAndUpdate(data.donorId, {
    $push: { donated: data._id },
  }).exec();

  // add the donation to the user's received list
  await UserModel.findByIdAndUpdate(data.receiverId, {
    $push: { donationReceived: data._id },
  }).exec();

  return data;
};

// Get All Donations
const getAllDonations = async () => {
  return await DonationModel.find().exec();
};

// Get Donations By Id
const getDonationById = async (id: string) => {
  return await DonationModel.findById(id).exec();
};

// Get Donations by user id
const getDonationsByUserId = async (id: ObjectId) => {
  const donation = await DonationModel.find({
    $or: [{ receiverId: id }, { donorId: id }],
  }).exec();

  const received = donation.filter((don) => don.receiverId === id);
  const donated = donation.filter((don) => don.donorId === id);

  const data = { received, donated };
  return data;
};

// Update Donation status
const updateDonationStatus = async (id: string, data: IDonationStatus) => {
  return await DonationModel.findByIdAndUpdate(
    id,
    {
      $set: {
        "donationStatus.0.status": data.status,
        "donationStatus.0.time": new Date(),
        ...(data.reason && { "donationStatus.0.reason": data.reason }),
      },
    },
    { new: true }
  ).exec();
};

export const DonationService = {
  createDonation,
  getAllDonations,
  getDonationById,
  getDonationsByUserId,
  updateDonationStatus,
};
