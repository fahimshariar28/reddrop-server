import { DivisionService } from "./division.service";
import catchAsyncFunc from "../../../utils/catchAsyncFunc";
import sendResponseMessage from "../../../utils/sendResponse";
import httpStatus from "http-status";

// Create division
const createDivision = catchAsyncFunc(async (req, res) => {
  const division = await DivisionService.createDivision(req.body);
  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Division created successfully",
    data: division,
  });
});

// Get all divisions
const getAllDivisions = catchAsyncFunc(async (req, res) => {
  const data = await DivisionService.getAllDivisions();

  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Divisions fetched successfully",
    data: data,
  });
});

// Get division by id
const getDivisionById = catchAsyncFunc(async (req, res) => {
  const division = await DivisionService.getDivisionById(req.params.id);
  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Division fetched successfully",
    data: division,
  });
});

// Update division
const updateDivision = catchAsyncFunc(async (req, res) => {
  const division = await DivisionService.updateDivision(
    req.params.id,
    req.body
  );
  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Division updated successfully",
    data: division,
  });
});

// Delete division
const deleteDivision = catchAsyncFunc(async (req, res) => {
  const division = await DivisionService.deleteDivision(req.params.id);
  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Division deleted successfully",
    data: division,
  });
});

export const DivisionController = {
  createDivision,
  getAllDivisions,
  getDivisionById,
  updateDivision,
  deleteDivision,
};
