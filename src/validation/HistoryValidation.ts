import {z, ZodType} from "zod";

export class HistoryValidation {

  static readonly GET_BY_USER_ID: ZodType = z.object({
    userId: z.string({
      required_error: "User ID is required"
    }).min(1, "User ID must contain at least 1 character").max(255, "User ID cannot be longer than 100 characters")
  });

  static readonly CREATE_HISTORY_SAMBAL: ZodType = z.object({
    userId: z.string({
      required_error: "User ID is required"
    }).min(1, "User ID must contain at least 1 character").max(255, "User ID cannot be longer than 100 characters"),
    sambalName: z.string({
      required_error: "Sambal name is required"
    }).min(1, "Sambal name must contain at least 1 character").max(100, "Sambal name cannot be longer than 100 characters")
  });
}