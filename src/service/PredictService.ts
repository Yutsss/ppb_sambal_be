import fs from 'fs';
import path from 'path';
import {
  PredictionResult,
  PredictRequest,
  PredictResponse
} from '../model/PredictModel';
import { ResponseError } from '../error/ResponseError';
import { StatusCodes } from 'http-status-codes';
import axios from 'axios';
import FormData from 'form-data';

export class PredictService {
  static async predict(req: PredictRequest): Promise<PredictResponse> {
    const url = process.env.ML_URL as string;
    const roboflowUrl = process.env.ROBOFLOW_URL as string;
    const roboflowApiKey = process.env.ROBOFLOW_API_KEY as string;

    if (!url || !roboflowUrl || !roboflowApiKey) {
      throw new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error");
    }

    // Health check to local ML service
    const mlHealthCheck = await axios.get(`${url}/health`);
    if (mlHealthCheck.status !== StatusCodes.OK) {
      throw new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error");
    }

    const filePath = req.filePath as string;

    // ===== Roboflow Prediction =====
    const base64Image = fs.readFileSync(filePath, { encoding: 'base64' });

    const roboflowResponse: any = await axios.post(`${roboflowUrl}`, base64Image, {
      params: {
        api_key: roboflowApiKey
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (roboflowResponse.status !== StatusCodes.OK) {
      throw new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error");
    }

    const roboflowPred: any = roboflowResponse.data.predictions;

    if (roboflowPred.length === 0 || roboflowPred.confidence < 0.5) {
      fs.unlinkSync(filePath);
      throw new ResponseError(StatusCodes.BAD_REQUEST, "This image does not contain any sambal");
    }

    // Local ML Prediction
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    const response = await axios.post(`${url}/predict`, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    if (response.status !== StatusCodes.OK) {
      throw new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error");
    }

    fs.unlinkSync(filePath);

    const data = response.data as PredictResponse;

    for (const item of data.predictions) {
      const sambalDir = process.env.SAMBAL_PATH as string;
      const imagePath = path.join(sambalDir, item.class).replace(/\\/g, '/');
      const images = fs.readdirSync(imagePath);
      const randomImage = images[Math.floor(Math.random() * images.length)];
      item.imagePath = path.join(imagePath, randomImage).replace(/\\/g, '/');

      const sambalName = item.class.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
      item.name = sambalName;
    }

    const res: PredictResponse = {
      predictions: data.predictions,
    };

    return res;
  }
}
