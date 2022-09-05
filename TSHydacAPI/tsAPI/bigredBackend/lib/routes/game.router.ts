import express, { Request, Response } from "express";

import * as GameController from "../controllers/game.controller";

export const gameRouter = express.Router();

gameRouter.post("/", GameController.postNewGame);

gameRouter.get("/", GameController.getHighscores);
