import GenericError from "../../../errors/genericError";
import { DistrictModel } from "../district/district.model";
import { IDivision } from "./division.interface";
import { DivisionModel } from "./division.model";
import httpStatus from "http-status";

const createDivision = async (division: IDivision): Promise<IDivision> => {
  // Check if the division already exists
  const existingDivision = await DivisionModel.findOne({
    name: division.name,
  });

  if (existingDivision) {
    throw new GenericError(httpStatus.BAD_REQUEST, "Division already exists");
  }

  const newDivision = new DivisionModel(division);
  return await newDivision.save();
};

const getAllDivisions = async (): Promise<IDivision[]> => {
  return await DivisionModel.find().sort({ name: 1 });
};

const getDivisionById = async (id: string): Promise<IDivision | null> => {
  const division = await DivisionModel.findById(id);

  if (!division) {
    throw new GenericError(httpStatus.NOT_FOUND, "Division not found");
  }

  return division;
};

const updateDivision = async (
  id: string,
  division: Partial<IDivision>
): Promise<IDivision | null> => {
  // Check if the division exists
  const existingDivisionById = await DivisionModel.findById(id);
  if (!existingDivisionById) {
    throw new GenericError(httpStatus.NOT_FOUND, "Division not found");
  }

  // Check if the division already exists
  const existingDivision = await DivisionModel.findOne({
    name: division.name,
  });

  if (existingDivision) {
    throw new GenericError(httpStatus.BAD_REQUEST, "Division already exists");
  }

  return await DivisionModel.findByIdAndUpdate(id, division, {
    new: true,
  });
};

const deleteDivision = async (id: string): Promise<IDivision | null> => {
  // Check if the division exists
  const existingDivision = await DivisionModel.findById(id);
  if (!existingDivision) {
    throw new GenericError(httpStatus.NOT_FOUND, "Division not found");
  }

  // Check if the division has any associated districts
  const district = await DistrictModel.findOne({ division: id });
  if (district) {
    throw new GenericError(
      httpStatus.BAD_REQUEST,
      "Division cannot be deleted because it has associated districts. Please delete the districts first."
    );
  }

  return await DivisionModel.findByIdAndDelete(id);
};

export const DivisionService = {
  createDivision,
  getAllDivisions,
  getDivisionById,
  updateDivision,
  deleteDivision,
};
