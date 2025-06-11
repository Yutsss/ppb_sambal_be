import db from "../config/database";
import { History, HistorySambal } from "../model/HistoryModel";

export class HistoryRepository {
  static async create(userId: string): Promise<History> {
    return await db.history.create({
      data: {
        userId: userId,
      },
    });
  }

  static async getByUserId(userId: string): Promise<History | null> {
    return await db.history.findUnique({
      where: {
        userId: userId,
      },
    })
  }

  static async createHistorySambal(historyId: string, sambalId: string) {
    return await db.historySambal.create({
      data: {
        historyId: historyId,
        sambalId: sambalId,
      },
    });
  }

  static async getHistorySambalBySambalIdAndHistoryId(sambalId: string, historyId: string): Promise<HistorySambal | null> {
    return await db.historySambal.findFirst({
      where: {
        sambalId: sambalId,
        historyId: historyId,
      },
      select: {
        historyId: true,
        sambal: true
      }
    });
  }

  static async getHistorySambalByHistoryId(historyId: string): Promise<HistorySambal[]> {
    return await db.historySambal.findMany({
      where: {
        historyId: historyId,
      },
      select: {
        historyId: true,
        sambal: true
      }
    });
  }
}