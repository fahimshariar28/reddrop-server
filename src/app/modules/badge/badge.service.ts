import { IBadge } from "./badge.interface";
import { BadgeModel } from "./badge.model";

// Create a new badge
const createBadge = async (badge: IBadge): Promise<IBadge> => {
  const newBadge = new BadgeModel(badge);
  return await newBadge.save();
};

// Get all badges
const getAllBadges = async () => {
  return await BadgeModel.find();
};

// Get a badge by ID
const getBadgeById = async (badgeId: string): Promise<IBadge | null> => {
  return await BadgeModel.findById(badgeId);
};

// Update a badge
const updateBadge = async (
  badgeId: string,
  badge: IBadge
): Promise<IBadge | null> => {
  return await BadgeModel.findByIdAndUpdate(badgeId, badge, { new: true });
};

// Delete a badge
const deleteBadge = async (badgeId: string): Promise<IBadge | null> => {
  return await BadgeModel.findByIdAndDelete(badgeId);
};

export const badgeService = {
  createBadge,
  getAllBadges,
  getBadgeById,
  updateBadge,
  deleteBadge,
};
