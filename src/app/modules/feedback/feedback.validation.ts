import { z } from "zod";

const feedbackDetailsValidation = z.object({
  feedback: z.string().min(1, "Feedback must be at least 1 character long"),
  rating: z
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
});

export const feedbackValidationSchema = z.object({
  donationId: z.string(),
  donorId: z.string(),
  receiverId: z.string(),
  donorFeedback: feedbackDetailsValidation.optional(),
  receiverFeedback: feedbackDetailsValidation.optional(),
});
