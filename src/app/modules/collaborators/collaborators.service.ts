import { ICollaborators } from "./collaborators.interface";
import CollaboratorsModel from "./collaborators.model";

const createCollaborator = async (collaborator: ICollaborators) => {
  return await CollaboratorsModel.create(collaborator);
};

const getAllCollaborators = async () => {
  return await CollaboratorsModel.find().select("-__v");
};

const updateCollaborator = async (collaborator: ICollaborators) => {
  return await CollaboratorsModel.findByIdAndUpdate(
    collaborator._id,
    collaborator,
    { new: true }
  );
};

const deleteCollaborator = async (collaboratorId: string) => {
  return await CollaboratorsModel.findByIdAndDelete(collaboratorId);
};

export const CollaboratorService = {
  createCollaborator,
  getAllCollaborators,
  updateCollaborator,
  deleteCollaborator,
};
