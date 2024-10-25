import UserModel from "../user/user.model";
import { IRequest, IRequestStatus } from "./request.interface";
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

// Update a request status by id
const updateRequest = async (id: string, data: IRequestStatus) => {
  return await RequestModel.findByIdAndUpdate(
    id,
    {
      $set: {
        "requestStatus.0.status": data.status,
        "requestStatus.0.time": new Date(),
        ...(data.reason && { "requestStatus.0.reason": data.reason }),
      },
    },
    { new: true }
  ).exec();
};

export const RequestService = {
  donationRequest,
  getAllRequests,
  getRequestsByUserId,
  getRequestById,
  updateRequest,
};
