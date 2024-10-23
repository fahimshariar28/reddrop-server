import { z } from "zod";

// Zod validation for division
export const divisionSchema = z.object({
  name: z.string(),
  districts: z
    .array(
      z.object({
        name: z.string(),
        upazilas: z.array(z.object({ name: z.string() })),
      })
    )
    .optional(),
});

// Zod validation for district
export const districtSchema = z.object({
  name: z.string(),
  upazilas: z.array(
    z.object({
      name: z.string(),
    })
  ),
});

// Zod validation for upazila
export const upazilaSchema = z.object({
  name: z.string(),
});
