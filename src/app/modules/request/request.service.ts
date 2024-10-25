import { ObjectId } from "mongoose";
import UserModel from "../user/user.model";
import { IRequest, IRequestStatus } from "./request.interface";
import RequestModel from "./request.model";
import { RequestStatus } from "../../enums/requestEnum";

// Create a new donation request
const donationRequest = async (requestData: IRequest) => {
  requestData.requestStatus = [
    {
      status: RequestStatus.PENDING,
      time: new Date(),
    },
  ];
  const request = new RequestModel(requestData);
  const data = await request.save();

  // add the request to the user's requested list
  await UserModel.findByIdAndUpdate(data.receiverId, {
    $push: { requestRequested: data._id },
  }).exec();

  // add the request to the user's received list
  await UserModel.findByIdAndUpdate(data.donorId, {
    $push: { requestReceived: data._id },
  }).exec();

  return data;
};

// Get all donation requests
const getAllRequests = async () => {
  const requests = await RequestModel.find();
  return requests;
};

// Get requests by user id
const getRequestsByUserId = async (id: ObjectId) => {
  // find from both receiverId and donorId
  const request = await RequestModel.find({
    $or: [{ receiverId: id }, { donorId: id }],
  });

  return request;
};

// Get donation request by id
const getRequestById = async (id: string) => {
  const request = await RequestModel.findById(id);
  return request;
};

// Update a request status by id
const updateRequest = async (id: string, data: IRequestStatus) => {
  const updatedData = await RequestModel.findByIdAndUpdate(
    id,
    { $push: { requestStatus: { $each: [data], $position: 0 } } },
    { new: true }
  ).exec();

  // If the status is accepted, add the request to the user's donated & donationReceived list
  if (data.status === RequestStatus.ACCEPTED && updatedData) {
    await UserModel.findByIdAndUpdate(updatedData.donorId, {
      $push: { donated: updatedData._id },
    }).exec();
  }
  if (data.status === RequestStatus.ACCEPTED && updatedData) {
    await UserModel.findByIdAndUpdate(updatedData.receiverId, {
      $push: { donationReceived: updatedData._id },
    }).exec();
  }

  return updatedData;
};

export const RequestService = {
  donationRequest,
  getAllRequests,
  getRequestsByUserId,
  getRequestById,
  updateRequest,
};
