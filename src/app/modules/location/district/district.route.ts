import { Router } from "express";
import authVerification from "../../../middlewares/authVerification";
import { ROLE } from "../../../enums/userEnum";
import { DistrictController } from "./district.controller";

const router = Router();

// Create a new district
router.post(
  "/",
  authVerification(ROLE.ADMIN),
  DistrictController.createDistrict
);

// Get all districts
router.get("/", DistrictController.getAllDistricts);

// Get a district by Id
router.get("/:id", DistrictController.getDistrictById);

// Get districts by division id
router.get("/division/:divisionId", DistrictController.getDistrictByDivisionId);

// Update a district by Id
router.put(
  "/:id",
  authVerification(ROLE.ADMIN),
  DistrictController.updateDistrict
);

// Delete a district by Id
router.delete(
  "/:id",
  authVerification(ROLE.ADMIN),
  DistrictController.deleteDistrict
);

export const districtRoute = router;
