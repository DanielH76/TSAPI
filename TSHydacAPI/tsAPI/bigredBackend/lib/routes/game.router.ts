import express, { Request, Response } from "express";

import * as GameController from "../controllers/game.controller";

export const gameRouter = express.Router();

gameRouter.post("/", GameController.postGame);

gameRouter.get("/", GameController.getHighscores);
