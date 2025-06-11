import { Router } from "express";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { SambalController } from "../controller/SambalController";

export const sambalRouter = Router();
sambalRouter.get("/", AuthMiddleware, SambalController.getAllSambal);
sambalRouter.get("/:class", AuthMiddleware, SambalController.getSambalByClass);
