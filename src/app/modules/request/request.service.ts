import UserModel from "../user/user.model";
import { IRequest } from "./request.interface";
import RequestModel from "./request.model";

// Create a new donation request
const donationRequest = async (requestData: IRequest) => {
  const request = new RequestModel(requestData);
  const data = await request.save();

  // add the request to the user's requested list
  await UserModel.findByIdAndUpdate(data.donorId, {
    $push: { requestRequested: data._id },
  }).exec();

  // add the request to the user's received list
  await UserModel.findByIdAndUpdate(data.receiverId, {
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
const getRequestsByUserId = async (id: string) => {
  // find from both receiverId and donorId
  const request = await RequestModel.find({
    $or: [{ receiverId: id }, { donorId: id }],
  });

  const received = request.filter((req) => req.receiverId === id);
  const requested = request.filter((req) => req.donorId === id);
  const data = { received, requested };
  return data;
};

// Get donation request by id
const getRequestById = async (id: string) => {
  const request = await RequestModel.findById(id);
  return request;
};

// Update a donation request by id
const updateRequest = async (requestId: string, data: Partial<IRequest>) => {
  const updatedRequest = await RequestModel.findByIdAndUpdate(requestId, data, {
    new: true,
  });
  return updatedRequest;
};

export const RequestService = {
  donationRequest,
  getAllRequests,
  getRequestsByUserId,
  getRequestById,
  updateRequest,
};
