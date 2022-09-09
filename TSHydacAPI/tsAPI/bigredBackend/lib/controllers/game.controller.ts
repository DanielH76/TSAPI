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

const postNewGameWithoutHighscore = async (req: Request, res: Response) => {
  const gameId: string = uuidv4();
  const scoreId: string = uuidv4();
  let { avgTime, numClicks, playerId, bestTime } = req.body;

  const score = highscoreGenerator.calculateHighscore(
    numClicks,
    avgTime,
    bestTime
  );

  /* const gameToCreate: Game = await sqlize.Games.create({
    GameId: gameId,
    Score: score,
    AverageTime: avgTime,
    NumberOfClicks: numClicks,
    PlayerId: playerId,
    BestTime: bestTime,
  });

  const highscoreToCreate: any = await sqlize.Highscores.create({
    HighscoreId: scoreId,
    GameId: gameId,
    PlayerId: playerId,
  });

  let body = {
    ...gameToCreate,
    ...highscoreToCreate,
  }; */

  // let insert1: string = `INSERT INTO Games(GameId, Score, AverageTime, NumberOfClicks, PlayerId, BestTime) `;
  // let values1: string = `VALUES ('${id}', ${score}, ${avgTime}, ${numClicks}, '${playerId}', ${bestTime});`;

  /* let transaction: string = "START TRANSACTION; ";
  let insert1: string =
    "INSERT INTO Games(GameId, score, AverageTime, NumberOfClicks, PlayerId, BestTime) ";
  let values1: string = `VALUES ('${gameId}', ${score}, ${avgTime}, ${numClicks}, '${playerId}', ${bestTime});`;
  let insert2: string = "INSERT INTO Highscores(HighscoreId, GameId, PlayerId)";
  let values2: string = `VALUES('${scoreId}','${gameId}','${playerId}'); `;
  let commit: string = "COMMIT;";

  const query: string = transaction.concat(
    insert1,
    values1,
    insert2,
    values2,
    commit
  );

  SendRequest(req, res, query); */
  return res.status(200).json(body);
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
