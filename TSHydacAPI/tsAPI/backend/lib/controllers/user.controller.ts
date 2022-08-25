import { NextFunction, Request, Response } from "express";
import { SendRequest } from "../config/mysql";
import * as Queries from "../config/queries";
import { v4 as uuidv4 } from "uuid";

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  SendRequest(req, res, Queries.UserQueries.GetAll());
};

const getUser = (req: Request, res: Response, next: NextFunction) => {
  SendRequest(req, res, Queries.UserQueries.GetById(req.params.id));
};

const createUser = (req: Request, res: Response) => {
  let { firstName, isOnsite, mood } = req.body;
  let id = uuidv4();
  let query = Queries.UserQueries.CreateUser(id, firstName, isOnsite, mood);

  SendRequest(req, res, query);
};

const updateUser = (req: Request, res: Response) => {
  let { firstName, isOnsite, mood } = req.body;
  const id: string = req.params.id;
  let query: string = Queries.UserQueries.UpdateUser(
    id,
    firstName,
    isOnsite,
    mood
  );

  SendRequest(req, res, query);
};

const deleteUser = (req: Request, res: Response) => {
  SendRequest(req, res, Queries.UserQueries.DeleteUser(req.params.id));
};

export default { getAllUsers, getUser, createUser, updateUser, deleteUser };
