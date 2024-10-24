import LocationModel from "./location.model";
import { IDistrict, IDivision, IUpazila } from "./location.interface";
import { Types } from "mongoose";
import GenericError from "../../errors/genericError";
import httpStatus from "http-status";

// Division Service
// Create a new division
const createDivision = async (divisionData: IDivision) => {
  const division = await LocationModel.create(divisionData); // Create a new division
  return division;
};

// Get all divisions (returning only names & ids)
const getAllDivisions = async () => {
  const divisions = await LocationModel.find({}, { name: 1, _id: 1 }); // Find all divisions and return only name and id
  return divisions;
};

// Update a division
const updateDivision = async (id: string, divisionData: IDivision) => {
  const division = await LocationModel.findByIdAndUpdate(id, divisionData, {
    new: true, // Return the updated document
    runValidators: true, // Ensure validation runs on the update
  });

  if (!division) {
    throw new GenericError(httpStatus.NOT_FOUND, "Division not found");
  }

  return division;
};

// Delete a division
const deleteDivision = async (id: string) => {
  const division = await LocationModel.findByIdAndDelete(id);
  if (!division) {
    throw new GenericError(httpStatus.NOT_FOUND, "Division not found");
  }
};

// District Service
// Add a new district to a division
const addDistrict = async (divisionId: string, districtData: IDistrict) => {
  const division = await LocationModel.findById(divisionId);
  if (!division) {
    throw new GenericError(httpStatus.NOT_FOUND, "Division not found");
  }
  division.districts.push(districtData);
  await division.save();
  return division;
};

// Update a district in a division
const updateDistrict = async (
  divisionId: string,
  districtId: string,
  districtData: IDistrict
) => {
  // Find the division by its ID
  const division = await LocationModel.findById(divisionId);
  if (!division) {
    throw new GenericError(httpStatus.NOT_FOUND, "Division not found");
  }

  // Find the district by its ID within the division's districts
  const district = division.districts.find(
    (d) => d._id && d._id.toString() === districtId
  );
  if (!district) {
    throw new GenericError(httpStatus.NOT_FOUND, "District not found");
  }

  // Update district properties
  district.name = districtData.name;
  district.upazilas = districtData.upazilas;

  // Save the updated division document
  await division.save();

  return district; // Return the updated district
};

// Delete a district from a division
const deleteDistrict = async (divisionId: string, districtId: string) => {
  // Find the division by its ID
  const division = await LocationModel.findById(divisionId);
  if (!division) {
    throw new GenericError(httpStatus.NOT_FOUND, "Division not found");
  }

  // Find the index of the district to delete
  const districtIndex = division.districts.findIndex(
    (d) => d._id && d._id.toString() === districtId
  );

  if (districtIndex === -1) {
    throw new GenericError(httpStatus.NOT_FOUND, "District not found");
  }

  // Remove the district from the districts array
  division.districts.splice(districtIndex, 1);

  // Save the updated division document
  await division.save();
};

// Get districts by division id
const getDistrictsByDivision = async (divisionId: string) => {
  const division = await LocationModel.findById(divisionId);
  if (!division) {
    throw new GenericError(httpStatus.NOT_FOUND, "Division not found");
  }

  // Map district names and ids
  const districtNameId = division.districts.map((district) => {
    return {
      district: district.name,
      districtId: district._id,
    };
  });
  return {
    division: division.name,
    divisionId: division._id,
    districts: districtNameId,
  };
};

// Upazila Service
// Create a new upazila in a district
const createUpazila = async (districtId: string, upazilaData: IUpazila) => {
  const division = await LocationModel.findOne({ "districts._id": districtId });

  if (!division) {
    throw new GenericError(httpStatus.NOT_FOUND, "District not found");
  }

  // Find the district
  const districtIndex = division.districts.findIndex(
    (d) => d._id && d._id.toString() === districtId
  );

  if (districtIndex === -1) {
    throw new GenericError(
      httpStatus.NOT_FOUND,
      "District not found in the found document"
    );
  }

  // Create the new upazila and push it into the district's upazilas array
  const newUpazila = { ...upazilaData, _id: new Types.ObjectId() }; // Assign a new _id
  division.districts[districtIndex].upazilas.push(newUpazila);

  await division.save(); // Save the updated division document

  return newUpazila; // Return the created upazila
};

// Get all upazilas by district ID
const getUpazilasByDistrict = async (districtId: string) => {
  const district = await LocationModel.findOne(
    { "districts._id": districtId },
    { "districts.$": 1 }
  );
  if (!district || district.districts.length === 0) {
    throw new GenericError(httpStatus.NOT_FOUND, "District not found");
  }
  return district.districts[0].upazilas;
};

// Update an upazila in a district
const updateUpazila = async (
  districtId: string,
  upazilaId: string,
  upazilaData: IUpazila
) => {
  // Find the division that contains the district
  const division = await LocationModel.findOne({ "districts._id": districtId });

  if (!division) {
    throw new GenericError(httpStatus.NOT_FOUND, "District not found");
  }

  // Find the index of the district using findIndex
  const districtIndex = division.districts.findIndex(
    (d) => d._id && d._id.toString() === districtId
  );

  if (districtIndex === -1) {
    throw new GenericError(
      httpStatus.NOT_FOUND,
      "District not found in the found document"
    );
  }

  // Find the district using the index
  const district = division.districts[districtIndex];

  // Find the index of the upazila to be updated
  const upazilaIndex = district.upazilas.findIndex(
    (u) => u._id && u._id.toString() === upazilaId
  );

  if (upazilaIndex === -1) {
    throw new GenericError(httpStatus.NOT_FOUND, "Upazila not found");
  }

  // Update the upazila's properties
  district.upazilas[upazilaIndex] = {
    ...district.upazilas[upazilaIndex],
    ...upazilaData,
  };

  await division.save(); // Save the updated division document

  return district.upazilas[upazilaIndex]; // Return the updated upazila
};

// Delete an upazila from a district
const deleteUpazila = async (districtId: string, upazilaId: string) => {
  // Find the division that contains the district
  const division = await LocationModel.findOne({ "districts._id": districtId });

  if (!division) {
    throw new GenericError(httpStatus.NOT_FOUND, "District not found");
  }

  // Find the index of the district using findIndex
  const districtIndex = division.districts.findIndex(
    (d) => d._id && d._id.toString() === districtId
  );

  if (districtIndex === -1) {
    throw new GenericError(
      httpStatus.NOT_FOUND,
      "District not found in the found document"
    );
  }

  // Find the district using the index
  const district = division.districts[districtIndex];

  // Find the index of the upazila to be deleted
  const upazilaIndex = district.upazilas.findIndex(
    (u) => u._id && u._id.toString() === upazilaId
  );

  if (upazilaIndex === -1) {
    throw new GenericError(httpStatus.NOT_FOUND, "Upazila not found");
  }

  // Remove the upazila from the array
  district.upazilas.splice(upazilaIndex, 1);

  await division.save(); // Save the updated division document
};

export const locationService = {
  createDivision,
  getAllDivisions,
  updateDivision,
  deleteDivision,
  addDistrict,
  updateDistrict,
  deleteDistrict,
  createUpazila,
  updateUpazila,
  deleteUpazila,
  getDistrictsByDivision,
  getUpazilasByDistrict,
};
