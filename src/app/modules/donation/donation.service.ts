import { ObjectId } from "mongoose";
import UserModel from "../user/user.model";
import { IDonation, IDonationStatus } from "./donation.interface";
import DonationModel from "./donation.model";
import { donationStatus } from "../../enums/donationEnum";

// Create Donation
const createDonation = async (donationData: IDonation) => {
  donationData.donationStatus = [
    {
      status: donationStatus.PENDING,
      time: new Date(),
    },
  ];

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

  return donation;
};

// Update Donation status
const updateDonationStatus = async (id: string, data: IDonationStatus) => {
  return await DonationModel.findByIdAndUpdate(
    id,
    { $push: { donationStatus: { $each: [data], $position: 0 } } },
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
