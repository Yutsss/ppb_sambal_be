import { Router } from "express";
import { HistoryController } from "../controller/HistoryController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export const historyRouter = Router();

historyRouter.get(
  "/",
  AuthMiddleware,
  HistoryController.getSambalHistory
);

historyRouter.post(
  "/sambal",
  AuthMiddleware,
  HistoryController.createSambalHistory
)

