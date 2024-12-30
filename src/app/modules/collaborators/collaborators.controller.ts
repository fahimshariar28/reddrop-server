import httpStatus from "http-status";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponseMessage from "../../utils/sendResponse";
import { CollaboratorService } from "./collaborators.service";
import { ICollaborators } from "./collaborators.interface";

const createCollaborator = catchAsyncFunc(async (req, res) => {
  const collaborator = await CollaboratorService.createCollaborator(
    req.body as ICollaborators
  );

  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Collaborator added successfully",
    data: collaborator,
  });
});

const getAllCollaborators = catchAsyncFunc(async (req, res) => {
  const collaborators = await CollaboratorService.getAllCollaborators();

  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Collaborators fetched successfully",
    data: collaborators,
  });
});

const updateCollaborator = catchAsyncFunc(async (req, res) => {
  const collaborator = await CollaboratorService.updateCollaborator(
    req.body as ICollaborators
  );

  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Collaborator updated successfully",
    data: collaborator,
  });
});

const deleteCollaborator = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;
  const collaborator = await CollaboratorService.deleteCollaborator(id);

  if (!collaborator) {
    sendResponseMessage(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "Collaborator not found",
    });
  }

  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Collaborator deleted successfully",
  });
});

export const CollaboratorController = {
  createCollaborator,
  getAllCollaborators,
  updateCollaborator,
  deleteCollaborator,
};
