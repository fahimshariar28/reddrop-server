import { Schema, model, Document } from "mongoose";
import { ICollaborators } from "./collaborators.interface";

// Mongoose Schema for Collaborators
const collaboratorsSchema = new Schema<ICollaborators & Document>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

const CollaboratorsModel = model<ICollaborators & Document>(
  "Collaborators",
  collaboratorsSchema
);

export default CollaboratorsModel;
