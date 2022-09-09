import { Request, Response } from "express";
import { SendRequest } from "../../../backend/lib/config/mysql";
import { v4 as uuidv4 } from "uuid";
import { Game, Player } from "../modules/game.interface";
import * as highscoreGenerator from "../composables/score.calculator";

const postNewGameWithHighscore = async (req: Request, res: Response) => {
  const id: string = uuidv4();
  let { highscore, avgTime, numClicks, playerId, bestTime } = req.body;

  let query: string = `INSERT INTO Games(GameId, Highscore, AverageTime, NumberOfClicks, PlayerId, BestTime) VALUES('${id}', ${highscore}, ${avgTime}, ${numClicks}, '${playerId}', ${bestTime})`;

  SendRequest(req, res, query);
};

const postNewGameWithoutHighscore = async (req: Request, res: Response) => {
  const id: string = uuidv4();
  let { avgTime, numClicks, playerId, bestTime } = req.body;

  const highscore = highscoreGenerator.calculateHighscore(
    numClicks,
    avgTime,
    bestTime
  );

  let query: string = `INSERT INTO Games(GameId, Highscore, AverageTime, NumberOfClicks, PlayerId, BestTime) VALUES ('${id}', ${highscore}, ${avgTime}, ${numClicks}, '${playerId}', ${bestTime})`;

  SendRequest(req, res, query);
};

const getHighscores = async (req: Request, res: Response) => {
  let query = "SELECT * FROM Games ORDER BY Highscore DESC LIMIT 10";
  SendRequest(req, res, query);
};

export { postNewGameWithHighscore, postNewGameWithoutHighscore, getHighscores };
