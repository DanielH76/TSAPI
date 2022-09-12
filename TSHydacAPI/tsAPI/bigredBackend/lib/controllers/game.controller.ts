import { Request, Response } from "express";
import { SendRequest } from "../../../backend/lib/config/mysql";
import { v4 as uuidv4 } from "uuid";
import { Game, Player } from "../modules/game.interface";
import * as highscoreGenerator from "../composables/score.calculator";
import * as sqlize from "../../../backend/lib/config/sequelize";

const postNewGameWithHighscore = async (req: Request, res: Response) => {
  const id: string = uuidv4();
  let { highscore, avgTime, numClicks, playerId, bestTime } = req.body;

  let query: string = `INSERT INTO Games(GameId, Highscore, AverageTime, NumberOfClicks, PlayerId, BestTime) VALUES('${id}', ${highscore}, ${avgTime}, ${numClicks}, '${playerId}', ${bestTime})`;

  SendRequest(req, res, query);
};

const postGame = async (req: Request, res: Response) => {
  const gameId: string = uuidv4();
  let { avgTime, numClicks, playerId, bestTime } = req.body;

  if(playerId == null || playerId == "" ){
    playerId = uuidv4()
  }

  const score = highscoreGenerator.calculateHighscore(
    numClicks,
    avgTime,
    bestTime
  );

  const query: string = `INSERT INTO Games(GameId, Score, AverageTime, NumberOfClicks, PlayerId, BestTime) VALUES ('${gameId}', ${score}, ${avgTime}, ${numClicks}, '${playerId}', ${bestTime})`


  SendRequest(req, res, query); 
  
};

const getHighscores = async (req: Request, res: Response) => {
  let select: string = "SELECT Username, Score FROM Games ";
  let join: string = "INNER JOIN Players ON Games.PlayerId = Players.PlayerId ";
  let order: string = "ORDER BY Score DESC LIMIT 10";

  let query: string = select.concat(join, order);
  SendRequest(req, res, query);
};

export { postNewGameWithHighscore, postGame, getHighscores };
