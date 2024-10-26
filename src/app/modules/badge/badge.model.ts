import { Schema, model, Document } from "mongoose";
import { badgeTypeEnum } from "../../enums/badgeTypeEnum";
import { IBadge } from "./badge.interface";

const badgeSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    type: {
      type: String,
      enum: Object.keys(badgeTypeEnum),
      required: true,
    },
    requiredCount: { type: Number, required: true },
    countCriteria: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const BadgeModel = model<IBadge & Document>("Badge", badgeSchema);

export { BadgeModel };
