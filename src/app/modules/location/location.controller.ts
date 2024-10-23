import { locationService } from "./location.service";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponseMessage from "../../utils/sendResponse";
import httpStatus from "http-status";

// Division Controller
// Create a new division
const createDivision = catchAsyncFunc(async (req, res) => {
  const division = await locationService.createDivision(req.body);
  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Division created successfully",
    data: division,
  });
});

// Get all divisions
const getDivisions = catchAsyncFunc(async (req, res) => {
  const divisions = await locationService.getAllDivisions();
  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All divisions",
    data: divisions,
  });
});

// Update a division
const updateDivision = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;

  // Ensure districts is an empty array if not provided
  const divisionData = {
    name: req.body.name,
    districts: req.body.districts || [], // Default to empty array if undefined
  };

  const updatedDivision = await locationService.updateDivision(
    id,
    divisionData
  );
  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Division updated successfully",
    data: updatedDivision,
  });
});

// Delete a division
const deleteDivision = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;
  await locationService.deleteDivision(id);
  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.NO_CONTENT,
    message: "Division deleted successfully",
  });
});

// District Controller
// Add a new district to a division
const addDistrictToDivision = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;
  const districtData = req.body;
  const updatedDivision = await locationService.addDistrict(id, districtData);
  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "District added successfully",
    data: updatedDivision,
  });
});

// Update a district
const updateDistrict = catchAsyncFunc(async (req, res) => {
  const { divisionId, districtId } = req.params;
  const districtData = req.body;
  const updatedDistrict = await locationService.updateDistrict(
    divisionId,
    districtId,
    districtData
  );
  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "District updated successfully",
    data: updatedDistrict,
  });
});

// Delete a district
const deleteDistrict = catchAsyncFunc(async (req, res) => {
  const { divisionId, districtId } = req.params;
  await locationService.deleteDistrict(divisionId, districtId);
  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.NO_CONTENT,
    message: "District deleted successfully",
  });
});

// Get districts by division name
const getDistrictsByDivision = catchAsyncFunc(async (req, res) => {
  const id = req.params.divisionId;
  const districts = await locationService.getDistrictsByDivision(id);
  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Districts by division",
    data: districts,
  });
});

// Upazila Controller
// Create a new upazila
const createUpazila = catchAsyncFunc(async (req, res) => {
  const { districtId } = req.params;
  const upazila = await locationService.createUpazila(districtId, req.body);
  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Upazila created successfully",
    data: upazila,
  });
});

// Get all upazilas by district ID
const getUpazilasByDistrict = catchAsyncFunc(async (req, res) => {
  const { districtId } = req.params;
  const upazilas = await locationService.getUpazilasByDistrict(districtId);
  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All upazilas for district",
    data: upazilas,
  });
});

// Update an upazila
const updateUpazila = catchAsyncFunc(async (req, res) => {
  const { districtId, upazilaId } = req.params;
  const upazila = await locationService.updateUpazila(
    districtId,
    upazilaId,
    req.body
  );
  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Upazila updated successfully",
    data: upazila,
  });
});
// Delete an upazila
const deleteUpazila = catchAsyncFunc(async (req, res) => {
  const { districtId, upazilaId } = req.params;

  await locationService.deleteUpazila(districtId, upazilaId);

  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.NO_CONTENT,
    message: "Upazila deleted successfully",
  });
});

export const locationController = {
  createDivision,
  getDivisions,
  updateDivision,
  deleteDivision,
  addDistrictToDivision,
  updateDistrict,
  deleteDistrict,
  createUpazila,
  updateUpazila,
  deleteUpazila,
  getDistrictsByDivision,
  getUpazilasByDistrict,
};
