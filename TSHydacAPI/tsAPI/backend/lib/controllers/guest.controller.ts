import { NextFunction, Request, Response } from "express";
import { SendRequest } from "../config/mysql";
import * as Queries from "../config/queries";
import { v4 as uuidv4 } from "uuid";

const getAllGuests = (req: Request, res: Response) => {
  SendRequest(req, res, Queries.GuestQueries.GetAll());
};
const getGuest = (req: Request, res: Response) => {
  SendRequest(req, res, Queries.GuestQueries.GetById(req.params.id));
};

const getGuestsByEmployee = (req: Request, res: Response) => {
  SendRequest(req, res, Queries.GuestQueries.GetGuestByEmployee(req.params.id));
};

const createGuest = (req: Request, res: Response) => {
  console.log(req.body);
  const id: string = uuidv4();
  let { firstName, employeeId, isOnsite } = req.body;
  console.log(employeeId, isOnsite, isOnsite);
  SendRequest(
    req,
    res,
    Queries.GuestQueries.CreateGuest(id, firstName, employeeId, isOnsite)
  );
};

const updateGuest = (req: Request, res: Response) => {
  const id: string = req.params.id;
  let { firstName, employeeId, isOnsite } = req.body;
  SendRequest(
    req,
    res,
    Queries.GuestQueries.UpdateGuest(id, firstName, employeeId, isOnsite)
  );
};

const updateAbsence = (req: Request, res: Response) => {
  const id: string = req.params.id;
  let { isOnsite } = req.body;
  SendRequest(req, res, Queries.GuestQueries.UpdateAbsence(id, isOnsite));
};

const deleteGuest = (req: Request, res: Response) => {
  SendRequest(req, res, Queries.GuestQueries.DeleteGuest(req.params.id));
};

export {
  getAllGuests,
  getGuest,
  createGuest,
  updateGuest,
  deleteGuest,
  updateAbsence,
  getGuestsByEmployee,
};
