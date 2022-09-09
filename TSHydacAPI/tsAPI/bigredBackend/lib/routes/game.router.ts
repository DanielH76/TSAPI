import express, { Request, Response } from "express";

import * as GameController from "../controllers/game.controller";

export const gameRouter = express.Router();

gameRouter.post("/", GameController.postNewGameWithoutHighscore);

gameRouter.get("/", GameController.getHighscores);
