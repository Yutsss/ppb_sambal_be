import fs from "fs";
import path from "path";
import { UserRepository } from "../repository/UserRepository";
import { ResponseError } from "../error/ResponseError";
import { Validation } from "../utils/validation";
import { HistoryValidation } from "../validation/HistoryValidation";
import { CreateHistorySambalRequest, GetSambalHistoryRequest, GetSambalHistoryResponse, HistoryItem } from "../model/HistoryModel";
import { HistoryRepository } from "../repository/HistoryRepository";
import { StatusCodes } from "http-status-codes";
import { SambalRepository } from "../repository/SambalRepository";

export class HistoryService {
  static async getSambalHistoryByUserId(request: GetSambalHistoryRequest): Promise<GetSambalHistoryResponse> {
    const data = Validation.validation(HistoryValidation.GET_BY_USER_ID, request);

    const user = await UserRepository.findById(data.userId);

    if (!user) {
      throw new ResponseError(StatusCodes.NOT_FOUND, "User not found");
    }

    const history = await HistoryRepository.getByUserId(data.userId);

    if (!history) {
      throw new ResponseError(StatusCodes.NOT_FOUND, "Sambal history not found for this user");
    }

    const historySambal = await HistoryRepository.getHistorySambalByHistoryId(history.id);

    let historyItemns: HistoryItem[] = [];

    for (const item of historySambal) {
      const sambal = item.sambal;
      if (!sambal) {
        continue; 
      }

      const SAMBAL_PATH = process.env.SAMBAL_PATH as string;
      const SAMBAL_DIR = path.join(SAMBAL_PATH, sambal.picture).replace(/\\/g, '/');
      // ambil gambar pertama pada sambal dir
      const images = fs.readdirSync(SAMBAL_DIR);
      const randomImage = images[Math.floor(Math.random() * images.length)];
      const imgUrl = path.join(SAMBAL_DIR, randomImage).replace(/\\/g, '/');
      historyItemns.push({
        sambalId: sambal.id,
        sambalName: sambal.name,
        imgUrl: imgUrl,
      });
    }

    return {
      history: historyItemns,
    }
  }

  static async createHistorySambal(request: CreateHistorySambalRequest): Promise<void> {
    const data = Validation.validation(HistoryValidation.CREATE_HISTORY_SAMBAL, request);

    const user = await UserRepository.findById(data.userId);

    if (!user) {
      throw new ResponseError(StatusCodes.NOT_FOUND, "User not found");
    }

    const history = await HistoryRepository.getByUserId(data.userId);

    if (!history) {
      throw new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error");
    }

    const sambal = await SambalRepository.getByName(data.sambalName);
    if (!sambal) {
      throw new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error");
    }

    const existingHistorySambal = await HistoryRepository.getHistorySambalBySambalIdAndHistoryId(sambal.id, history.id);
    if (existingHistorySambal) {
      return;
    }

    await HistoryRepository.createHistorySambal(history.id, sambal.id);
  }
}