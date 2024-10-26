import httpStatus from "http-status";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponseMessage from "../../utils/sendResponse";
import { IBadge } from "./badge.interface";
import { badgeService } from "./badge.service";

// Get create badge
const createBadge = catchAsyncFunc(async (req, res) => {
  const badge = await badgeService.createBadge(req.body as IBadge);

  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Badge created successfully",
    data: badge,
  });
});

// Get all badges
const getAllBadges = catchAsyncFunc(async (req, res) => {
  const badges = await badgeService.getAllBadges();

  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Badges fetched successfully",
    data: badges,
  });
});

// Get a badge by ID
const getBadgeById = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;
  const badge = await badgeService.getBadgeById(id);

  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Badge fetched successfully",
    data: badge,
  });
});

// Update a badge
const updateBadge = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;
  const badge = await badgeService.updateBadge(id, req.body as IBadge);

  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Badge updated successfully",
    data: badge,
  });
});

// Delete a badge
const deleteBadge = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;
  const badge = await badgeService.deleteBadge(id);

  sendResponseMessage(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Badge deleted successfully",
    data: badge,
  });
});

export const badgeController = {
  createBadge,
  getAllBadges,
  getBadgeById,
  updateBadge,
  deleteBadge,
};
