import { BloodGroup } from "../../enums/userEnum";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponseMessage from "../../utils/sendResponse";
import { IRequest } from "./request.interface";
import { RequestService } from "./request.service";
import { RequestValidationSchema } from "./request.validation";

// Create a new request
const createRequest = catchAsyncFunc(async (req, res) => {
  const requestValidation = RequestValidationSchema.parse({
    ...req.body,
    bloodGroup: req.body.bloodGroup as keyof typeof BloodGroup,
  });

  const request = await RequestService.donationRequest(
    requestValidation as unknown as IRequest
  );

  sendResponseMessage(res, {
    success: true,
    statusCode: 201,
    message: "Request created successfully",
    data: request,
  });
});

// Get all requests
const getAllRequests = catchAsyncFunc(async (req, res) => {
  const requests = await RequestService.getAllRequests();

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "Requests fetched successfully",
    data: requests,
  });
});

// Get requests by user ID
const getRequestsByUserId = catchAsyncFunc(async (req, res) => {
  const id = req.user.id;

  const requests = await RequestService.getRequestsByUserId(id);

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "Requests fetched successfully",
    data: requests,
  });
});

// Get request by ID
const getRequestById = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;

  const request = await RequestService.getRequestById(id);

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "Request fetched successfully",
    data: request,
  });
});

// Update a request by ID
const updateRequest = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;
  const updatedRequest = await RequestService.updateRequest(id, req.body);

  if (!updatedRequest) {
    sendResponseMessage(res, {
      success: false,
      statusCode: 404,
      message: "Request not found",
    });
  }

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "Request updated successfully",
    data: updatedRequest,
  });
});

export const RequestController = {
  createRequest,
  getAllRequests,
  getRequestsByUserId,
  getRequestById,
  updateRequest,
};
