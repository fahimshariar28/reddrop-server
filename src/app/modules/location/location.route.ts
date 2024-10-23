import { Router } from "express";
import { locationController } from "./location.controller";

const router = Router();

// Division routes
router.post("/divisions", locationController.createDivision);
router.get("/divisions", locationController.getDivisions);
router.put("/divisions/:id", locationController.updateDivision);
router.delete("/divisions/:id", locationController.deleteDivision);

// District routes
router.post(
  "/divisions/:id/districts",
  locationController.addDistrictToDivision
);
router.get("/:divisionId/districts", locationController.getDistrictsByDivision);
router.put(
  "/divisions/:divisionId/districts/:districtId",
  locationController.updateDistrict
);
router.delete(
  "/divisions/:divisionId/districts/:districtId",
  locationController.deleteDistrict
);

// Upazila routes
router.post(
  "/districts/:districtId/upazilas",
  locationController.createUpazila
);
router.get("/:districtId/upazilas", locationController.getUpazilasByDistrict);
router.put(
  "/:districtId/upazilas/:upazilaId",
  locationController.updateUpazila
);
router.delete(
  "/:districtId/upazilas/:upazilaId",
  locationController.deleteUpazila
);

export const locationRoute = router;
