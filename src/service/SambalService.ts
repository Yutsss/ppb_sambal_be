import fs from 'fs';
import path from 'path';
import { ResponseError } from '../error/ResponseError';
import { StatusCodes } from 'http-status-codes';
import { Validation } from "../utils/validation";
import { SambalValidation } from '../validation/SambalValidation';
import { GetSambalByClassRequest, GetSambalByClassResponse } from '../model/SambalModel';
import { SambalRepository } from '../repository/SambalRepository';
import { Sambal } from '../model/SambalModel';

export class SambalService {
  static async getSambalByClass(request: GetSambalByClassRequest): Promise<GetSambalByClassResponse> {
    const data = Validation.validation(SambalValidation.GET_BY_CLASS, request);

    const sambalName = data.class.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

    const sambal: Sambal | null = await SambalRepository.getByName(sambalName);

    if (!sambal) {
      throw new ResponseError(StatusCodes.NOT_FOUND, "Sambal not found");
    }

    const sambalDir = process.env.SAMBAL_PATH as string;
    const imagePath = path.join(sambalDir, sambal.picture).replace(/\\/g, '/');
    if (!fs.existsSync(imagePath)) {
      throw new ResponseError(StatusCodes.NOT_FOUND, "Sambal picture not found");
    }
    const images = fs.readdirSync(imagePath);
    if (images.length === 0) {
      throw new ResponseError(StatusCodes.NOT_FOUND, "No pictures found for this sambal");
    }

    const randomImages = [];
    for (let i = 0; i < 5; i++) {
      const randomImage = images[Math.floor(Math.random() * images.length)];
      randomImages.push(path.join(imagePath, randomImage).replace(/\\/g, '/'));
    }

    return {
      sambalData: sambal,
      pictures: randomImages
    };
  }

  static async getAllSambal(): Promise<Sambal[]> {
    const sambals = await SambalRepository.getAll();
    if (!sambals || sambals.length === 0) {
      throw new ResponseError(StatusCodes.NOT_FOUND, "No sambal found");
    }

    const sambalDir = process.env.SAMBAL_PATH as string;
    for (const sambal of sambals) {
      const imagePath = path.join(sambalDir, sambal.picture).replace(/\\/g, '/');
      const images = fs.readdirSync(imagePath);
      const randomImage = images[Math.floor(Math.random() * images.length)];
      sambal.picture = path.join(imagePath, randomImage).replace(/\\/g, '/');
    }
    return sambals;
  }
}