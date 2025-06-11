import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { successResponse, errorResponse } from "../utils/api-response";
import { ResponseError } from "../error/ResponseError";
import { GetSambalHistoryRequest, CreateHistorySambalRequest } from "../model/HistoryModel";
import { AuthRequest } from "../model/AuthModel";
import { HistoryService } from "../service/HistoryService";

export class HistoryController {
  static async getSambalHistory(req: Request, res: Response) {
    try {
      const authReq = req as AuthRequest;
      const historyReq: GetSambalHistoryRequest = {
        userId: authReq.user?.id,
      };
      const response = await HistoryService.getSambalHistoryByUserId(historyReq);
      successResponse(res, StatusCodes.OK, "Success Getting Sambal History", response);
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error'));
      }
    }
  }

  static async createSambalHistory(req: Request, res: Response) {
    try {
      const authReq = req as AuthRequest;
      const historyReq: CreateHistorySambalRequest = {
        userId: authReq.user?.id,
        sambalName: req.body.sambalName,
      };
      const response = await HistoryService.createHistorySambal(historyReq);
      successResponse(res, StatusCodes.CREATED, "Success Creating Sambal History", response);
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error'));
      }
    }
  }
}