import catchAsyncFunc from "../../../utils/catchAsyncFunc";
import sendResponseMessage from "../../../utils/sendResponse";
import httpStatus from "http-status";
import { DistrictService } from "./district.service";

// Create district
const createDistrict = catchAsyncFunc(async (req, res) => {
  const district = await DistrictService.createDistrict(req.body);
  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "District created successfully",
    data: district,
  });
});

// Get all districts
const getAllDistricts = catchAsyncFunc(async (req, res) => {
  const data = await DistrictService.getAllDistricts();

  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Districts fetched successfully",
    data: data,
  });
});

// Get district by id
const getDistrictById = catchAsyncFunc(async (req, res) => {
  const district = await DistrictService.getDistrictById(req.params.id);
  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "District fetched successfully",
    data: district,
  });
});

// Get district by division id
const getDistrictByDivisionId = catchAsyncFunc(async (req, res) => {
  const district = await DistrictService.getDistrictByDivisionId(
    req.params.divisionId
  );
  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Districts fetched successfully",
    data: district,
  });
});

// Update district
const updateDistrict = catchAsyncFunc(async (req, res) => {
  const district = await DistrictService.updateDistrict(
    req.params.id,
    req.body
  );
  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "District updated successfully",
    data: district,
  });
});

// Delete district
const deleteDistrict = catchAsyncFunc(async (req, res) => {
  const district = await DistrictService.deleteDistrict(req.params.id);
  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "District deleted successfully",
    data: district,
  });
});

export const DistrictController = {
  createDistrict,
  getAllDistricts,
  getDistrictById,
  getDistrictByDivisionId,
  updateDistrict,
  deleteDistrict,
};
