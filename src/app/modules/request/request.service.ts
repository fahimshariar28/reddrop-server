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
  await UserModel.findByIdAndUpdate(data.receiver, {
    $push: { requestRequested: { $each: [data._id], $position: 0 } },
  }).exec();

  // add the request to the user's received list
  await UserModel.findByIdAndUpdate(data.donor, {
    $push: { requestReceived: { $each: [data._id], $position: 0 } },
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
  // find from receiverId
  const requested = await RequestModel.find({ receiver: id });

  // find from donorId
  const received = await RequestModel.find({ donor: id });

  const request = {
    received,
    requested,
  };

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

  return updatedData;
};

export const RequestService = {
  donationRequest,
  getAllRequests,
  getRequestsByUserId,
  getRequestById,
  updateRequest,
};
