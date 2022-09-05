import { Request, Response } from "express";
import { SendRequest } from "../../../backend/lib/config/mysql";
import { v4 as uuidv4 } from "uuid";
import { Game } from "../modules/game.interface";

const postNewGame = async (req: Request, res: Response) => {
  const id: string = uuidv4();
  let { highscore, avgTime, numClicks } = req.body;

  let query: string = `INSERT INTO Games(GameID, Highscore, AverageTime, NumberOfClicks) VALUES('${id}', ${highscore}, ${avgTime}, ${numClicks})`;

  SendRequest(req, res, query);
};

export { postNewGame };
