import GenericError from "../../../errors/genericError";
import { DivisionModel } from "../division/division.model";
import { UpazilaModel } from "../upazila/upazila.model";
import { IDistrict } from "./district.interface";
import { DistrictModel } from "./district.model";
import httpStatus from "http-status";

// Create new district
const createDistrict = async (data: IDistrict): Promise<IDistrict> => {
  // Check if the division exists
  const existingDivision = await DivisionModel.findById(data.division);
  if (!existingDivision) {
    throw new GenericError(httpStatus.NOT_FOUND, "Division not found");
  }

  // Check if the district already exists
  const existingDistrict = await DistrictModel.findOne({
    name: data.name,
    division: data.division,
  });

  if (existingDistrict) {
    throw new GenericError(httpStatus.BAD_REQUEST, "District already exists");
  }

  const newDistrict = new DistrictModel(data);
  return await newDistrict.save();
};

// Get all districts
const getAllDistricts = async (): Promise<IDistrict[]> => {
  return await DistrictModel.find().populate("division").sort({ name: 1 });
};

// Get district by id
const getDistrictById = async (id: string): Promise<IDistrict | null> => {
  const district = await DistrictModel.findById(id).populate("division");

  if (!district) {
    throw new GenericError(httpStatus.NOT_FOUND, "District not found");
  }

  return district;
};

// Get district by division id
const getDistrictByDivisionId = async (
  divisionId: string
): Promise<IDistrict[]> => {
  const districts = await DistrictModel.find({ division: divisionId })
    .populate("division")
    .sort({ name: 1 });

  if (!districts || districts.length === 0) {
    throw new GenericError(
      httpStatus.NOT_FOUND,
      "There is no district under this division"
    );
  }

  return districts;
};

// Update district
const updateDistrict = async (
  id: string,
  data: Partial<IDistrict>
): Promise<IDistrict | null> => {
  // Check if the district exists
  const existingDistrictById = await DistrictModel.findById(id);
  if (!existingDistrictById) {
    throw new GenericError(httpStatus.NOT_FOUND, "District not found");
  }

  // Check if the district already exists
  const existingDistrict = await DistrictModel.findOne({
    name: data.name,
    division: data.division,
  });
  if (existingDistrict) {
    throw new GenericError(httpStatus.BAD_REQUEST, "District already exists");
  }

  return await DistrictModel.findByIdAndUpdate(id, data, {
    new: true,
  }).populate("division");
};

// Delete district
const deleteDistrict = async (id: string): Promise<IDistrict | null> => {
  // Check if the district exists
  const existingDistrictById = await DistrictModel.findById(id);
  if (!existingDistrictById) {
    throw new GenericError(httpStatus.NOT_FOUND, "District not found");
  }

  // Check if the district has any associated upazilas
  const upazila = await UpazilaModel.findOne({ district: id });
  if (upazila) {
    throw new GenericError(
      httpStatus.BAD_REQUEST,
      "District cannot be deleted because it has associated upazilas. Please delete the upazilas first."
    );
  }

  return await DistrictModel.findByIdAndDelete(id);
};

export const DistrictService = {
  createDistrict,
  getAllDistricts,
  getDistrictById,
  getDistrictByDivisionId,
  updateDistrict,
  deleteDistrict,
};
