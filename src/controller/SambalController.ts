import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseError } from "../error/ResponseError";
import { successResponse, errorResponse } from "../utils/api-response";
import { GetSambalByClassRequest } from "../model/SambalModel";
import { SambalService } from "../service/SambalService";

export class SambalController {
  static async getSambalByClass(req: Request, res: Response) {
    try {
      const sambalReq: GetSambalByClassRequest = {
        class: req.params.class,
      };
      const response = await SambalService.getSambalByClass(sambalReq);
      successResponse(res, StatusCodes.OK, "Success Getting Sambal", response);
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error'));
      }
    }
  }

  static async getAllSambal(req: Request, res: Response) {
    try {
      const response = await SambalService.getAllSambal();
      successResponse(res, StatusCodes.OK, "Success Getting All Sambal", response);
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error'));
      }
    }
  }
}
