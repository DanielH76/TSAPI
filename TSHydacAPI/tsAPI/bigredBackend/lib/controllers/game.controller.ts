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
  const GameId: string = uuidv4();
  const HighscoreId: string = uuidv4();
  let { avgTime, numClicks, playerId, bestTime } = req.body;

  const highscore = highscoreGenerator.calculateHighscore(
    numClicks,
    avgTime,
    bestTime
  );

  console.log(highscore);

  let insert1: string = `INSERT INTO Games(GameId, Score, AverageTime, NumberOfClicks, PlayerId, BestTime) `;
  let values1: string = `VALUES ('${GameId}', ${highscore}, ${avgTime}, ${numClicks}, '${playerId}', ${bestTime});`;

  const query: string = insert1.concat(values1);

  SendRequest(req, res, query);
};

const getHighscores = async (req: Request, res: Response) => {
  let select: string = "SELECT Score, Username FROM Highscores";
  let join1: string = "INNER JOIN Games ON Highscores.GameId = Games.GameId";
  let join2: string =
    "INNER JOIN Players ON Highscores.PlayerId = Players.PlayerId";
  let order: string = "ORDER BY Score DESC LIMIT 10";

  let query: string = select.concat(join1, join2, order);
  SendRequest(req, res, query);
};

export { postNewGameWithHighscore, postNewGameWithoutHighscore, getHighscores };
