import { NextFunction, Request, Response } from "express";
import { SendRequest } from "../config/mysql";
import * as Queries from "../config/queries";
import { v4 as uuidv4 } from "uuid";

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  SendRequest(req, res, Queries.UserQueries.GetAll);
};

const getUser = (req: Request, res: Response, next: NextFunction) => {
  let query = Queries.UserQueries.GetById + req.params.id;

  SendRequest(req, res, query);
};

const createUser = (req: Request, res: Response) => {
  let { firstName, isOnsite, mood } = req.body;
  let id = uuidv4();
  let stringsJoined: string =
    '"' + id + '"' + ',"' + firstName + '",' + isOnsite + ',"' + mood + '"';
  let query = Queries.UserQueries.CreateUser + stringsJoined + ")";

  SendRequest(req, res, query);
};

const updateUser = (req: Request, res: Response) => {
  let { firstName, isOnsite, mood } = req.body;
  console.log(req.body);
  const id: string = req.params.id;
  let query: string = `UPDATE Employees SET FirstName = "${firstName}", IsOnsite = ${isOnsite}, Mood = "${mood}" WHERE EmployeeID = "${id}"`;

  SendRequest(req, res, query);
};

const deleteUser = (req: Request, res: Response) => {
  const id: string = req.params.id;
  let query: string = `DELETE FROM Employees WHERE EmployeeId = "${id}"`;
  SendRequest(req, res, query);
};

export default { getAllUsers, getUser, createUser, updateUser, deleteUser };
