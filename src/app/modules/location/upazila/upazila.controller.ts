import catchAsyncFunc from "../../../utils/catchAsyncFunc";
import sendResponseMessage from "../../../utils/sendResponse";
import httpStatus from "http-status";
import { UpazilaService } from "./upazila.service";

// Create upazila
const createUpazila = catchAsyncFunc(async (req, res) => {
  const upazila = await UpazilaService.createUpazila(req.body);
  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Upazila created successfully",
    data: upazila,
  });
});

// Get all upazilas
const getAllUpazilas = catchAsyncFunc(async (req, res) => {
  const data = await UpazilaService.getAllUpazilas();

  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Upazilas fetched successfully",
    data: data,
  });
});

// Get upazila by id
const getUpazilaById = catchAsyncFunc(async (req, res) => {
  const upazila = await UpazilaService.getUpazilaById(req.params.id);
  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Upazila fetched successfully",
    data: upazila,
  });
});

// Get upazila by district id
const getUpazilaByDistrictId = catchAsyncFunc(async (req, res) => {
  const upazila = await UpazilaService.getUpazilaByDistrictId(
    req.params.districtId
  );
  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Upazilas fetched successfully",
    data: upazila,
  });
});

// Update upazila
const updateUpazila = catchAsyncFunc(async (req, res) => {
  const upazila = await UpazilaService.updateUpazila(req.params.id, req.body);
  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Upazila updated successfully",
    data: upazila,
  });
});

// Delete upazila
const deleteUpazila = catchAsyncFunc(async (req, res) => {
  const upazila = await UpazilaService.deleteUpazila(req.params.id);
  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Upazila deleted successfully",
    data: upazila,
  });
});

export const UpazilaController = {
  createUpazila,
  getAllUpazilas,
  getUpazilaById,
  getUpazilaByDistrictId,
  updateUpazila,
  deleteUpazila,
};
