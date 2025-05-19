import { Router } from "express";
import authVerification from "../../../middlewares/authVerification";
import { ROLE } from "../../../enums/userEnum";
import { DivisionController } from "./division.controller";

const router = Router();

// Create a new division
router.post(
  "/",
  authVerification(ROLE.ADMIN),
  DivisionController.createDivision
);

// Get all divisions
router.get("/", DivisionController.getAllDivisions);

// Get a division by Id
router.get("/:id", DivisionController.getDivisionById);

// Update a division by Id
router.put(
  "/:id",
  authVerification(ROLE.ADMIN),
  DivisionController.updateDivision
);

// Delete a division by Id
router.delete(
  "/:id",
  authVerification(ROLE.ADMIN),
  DivisionController.deleteDivision
);

export const divisionRoute = router;
