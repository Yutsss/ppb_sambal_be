import { Router } from "express";
import { uploadMiddleware } from "../middleware/UploadMiddleware";
import { PredictController } from "../controller/PredictController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export const predictRouter = Router();

predictRouter.post("/predict", AuthMiddleware, uploadMiddleware, PredictController.predict);






