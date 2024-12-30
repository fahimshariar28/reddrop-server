import { Router } from "express";
import authVerification from "../../middlewares/authVerification";
import { ROLE } from "../../enums/userEnum";
import { CollaboratorController } from "./collaborators.controller";

const router = Router();

// Route to create a new collaborator
router.post(
  "/",
  authVerification(ROLE.ADMIN),
  CollaboratorController.createCollaborator
);

// Route to get all collaborators
router.get("/", CollaboratorController.getAllCollaborators);

// Route to update a collaborator by ID
router.put(
  "/",
  authVerification(ROLE.ADMIN),
  CollaboratorController.updateCollaborator
);

// Route to delete a collaborator by ID
router.delete(
  "/:id",
  authVerification(ROLE.ADMIN),
  CollaboratorController.deleteCollaborator
);

export const collaboratorRoute = router;
