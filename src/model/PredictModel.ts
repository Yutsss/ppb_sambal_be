export interface PredictRequest {
  filePath: string;
}

export interface PredictResponse {
  predictions: PredictionResult[];
}

export interface PredictionResult {
  name: string;
  class: string;
  confidence: number;
  imagePath: string;
}
