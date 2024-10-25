import { BloodGroup } from "../../enums/userEnum";

export const userFilter = (query: Record<string, unknown>) => {
  const { bloodGroup, division, district, upazila, plasma } = query;

  // Initialize an empty filter object
  let userFilter: Record<string, unknown> = {};

  // Filter by blood group if provided
  if (bloodGroup) {
    const bloodGroupValue = BloodGroup[bloodGroup as keyof typeof BloodGroup];

    userFilter = { ...userFilter, bloodGroup: bloodGroupValue };
  }

  // Filter by division if provided
  if (division) {
    const divisionValue = division as string;
    userFilter = {
      ...userFilter,
      "presentAddress.division": divisionValue,
    };
  }

  // Filter by district if provided
  if (district) {
    const districtValue = district as string;
    userFilter = {
      ...userFilter,
      "presentAddress.district": districtValue,
    };
  }

  // Filter by upazila if provided
  if (upazila) {
    const upazilaValue = upazila as string;
    userFilter = {
      ...userFilter,
      "presentAddress.upazila": upazilaValue,
    };
  }

  // Filter by plasma if provided
  if (plasma) {
    userFilter = { ...userFilter, plasma };
  }

  return userFilter;
};
