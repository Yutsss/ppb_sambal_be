import db from "../config/database";
import { Sambal } from '../model/SambalModel';

export class SambalRepository {
  static async getByName(name: string) : Promise<Sambal | null> {
    return db.sambal.findUnique({
      where: {
        name: name
      },
    });
  }

  static async getAll(): Promise<Sambal[]> {
    return db.sambal.findMany({
      orderBy: {
        name: 'asc'
      }
    });
  }
}