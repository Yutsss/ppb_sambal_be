import {z, ZodType} from "zod";

export class SambalValidation {

  static readonly GET_BY_CLASS: ZodType = z.object({
    class: z.string({
      required_error: "Class is required"
    }).min(1, "Class must contain at least 1 character").max(100, "Class cannot be longer than 100 characters")
  });
}