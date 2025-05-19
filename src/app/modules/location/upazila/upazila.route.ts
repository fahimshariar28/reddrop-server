import { Router } from "express";
import authVerification from "../../../middlewares/authVerification";
import { UpazilaController } from "./upazila.controller";
import { ROLE } from "../../../enums/userEnum";

const router = Router();

// Create a new upazila
router.post("/", authVerification(ROLE.ADMIN), UpazilaController.createUpazila);

// Get all upazilas
router.get("/", UpazilaController.getAllUpazilas);

// Get a upazila by Id
router.get("/:id", UpazilaController.getUpazilaById);

// Get upazilas by district id
router.get("/district/:districtId", UpazilaController.getUpazilaByDistrictId);

// Update a upazila by Id
router.put(
  "/:id",
  authVerification(ROLE.ADMIN),
  UpazilaController.updateUpazila
);

// Delete a upazila by Id
router.delete(
  "/:id",
  authVerification(ROLE.ADMIN),
  UpazilaController.deleteUpazila
);

export const upazilaRoute = router;
