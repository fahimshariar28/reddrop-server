import GenericError from "../../../errors/genericError";
import { DistrictModel } from "../district/district.model";
import { IUpazila } from "./upazila.interface";
import { UpazilaModel } from "./upazila.model";
import httpStatus from "http-status";

// Create new upazila
const createUpazila = async (upazilaData: IUpazila): Promise<IUpazila> => {
  // Check if the district exists
  const existingDistrict = await DistrictModel.findById(upazilaData.district);
  if (!existingDistrict) {
    throw new GenericError(httpStatus.NOT_FOUND, "District not found");
  }

  // Check if the upazila already exists
  const existingUpazila = await UpazilaModel.findOne({
    name: upazilaData.name,
    district: upazilaData.district,
  });
  if (existingUpazila) {
    throw new GenericError(httpStatus.BAD_REQUEST, "Upazila already exists");
  }

  const newUpazila = new UpazilaModel(upazilaData);
  return await newUpazila.save();
};

// Get all upazilas
const getAllUpazilas = async (): Promise<IUpazila[]> => {
  return await UpazilaModel.find().populate("district").sort({ name: 1 });
};

// Get upazila by id
const getUpazilaById = async (id: string): Promise<IUpazila | null> => {
  // Check if the upazila exists
  const upazila = await UpazilaModel.findById(id).populate("district");
  if (!upazila) {
    throw new GenericError(httpStatus.NOT_FOUND, "Upazila not found");
  }

  return upazila;
};

// Get upazila by district id
const getUpazilaByDistrictId = async (
  districtId: string
): Promise<IUpazila[]> => {
  const upazila = await UpazilaModel.find({
    district: districtId,
  })
    .populate("district")
    .sort({ name: 1 });

  if (!upazila || upazila.length === 0) {
    throw new GenericError(
      httpStatus.NOT_FOUND,
      "There is no upazila under this district"
    );
  }

  return upazila;
};

// Update upazila
const updateUpazila = async (
  id: string,
  upazilaData: Partial<IUpazila>
): Promise<IUpazila | null> => {
  // Check if the upazila exists
  const existingUpazilaById = await UpazilaModel.findById(id);
  if (!existingUpazilaById) {
    throw new GenericError(httpStatus.NOT_FOUND, "Upazila not found");
  }

  // Check if the upazila already exists
  const existingUpazila = await UpazilaModel.findOne({
    name: upazilaData.name,
    district: upazilaData.district,
  });
  if (existingUpazila) {
    throw new GenericError(httpStatus.BAD_REQUEST, "Upazila already exists");
  }

  return await UpazilaModel.findByIdAndUpdate(id, upazilaData, {
    new: true,
  }).populate("district");
};

// Delete upazila
const deleteUpazila = async (id: string): Promise<IUpazila | null> => {
  // Check if the upazila exists
  const existingUpazilaById = await UpazilaModel.findById(id);
  if (!existingUpazilaById) {
    throw new GenericError(httpStatus.NOT_FOUND, "Upazila not found");
  }

  return await UpazilaModel.findByIdAndDelete(id);
};

export const UpazilaService = {
  createUpazila,
  getAllUpazilas,
  getUpazilaById,
  getUpazilaByDistrictId,
  updateUpazila,
  deleteUpazila,
};
