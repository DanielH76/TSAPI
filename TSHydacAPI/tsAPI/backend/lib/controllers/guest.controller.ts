import { NextFunction, Request, Response } from "express";
import { SendRequest } from "../config/mysql";
import * as Queries from "../config/queries";
import { v4 as uuidv4 } from "uuid";

const getAllGuests = (req: Request, res: Response) => {
  let query: string = "SELECT * FROM Guests";
  SendRequest(req, res, query);
};
const getGuest = (req: Request, res: Response) => {
  const id: string = req.params.id;
  let query: string = `SELECT * FROM Guests WHERE GuestId = "${id}"`;
  SendRequest(req, res, query);
};

const createGuest = (req: Request, res: Response) => {
  const id: string = uuidv4();
  let { firstName, employeeId, isOnsite } = req.body;
  let query: string = `INSERT INTO Guests(GuestId, FirstName, Employeeid, IsOnsite) VALUES("${id}", "${firstName}", "${employeeId}", ${isOnsite} )`;
  SendRequest(req, res, query);
};

const updateGuest = (req: Request, res: Response) => {
  const id: string = req.params.id;
  let { firstName, employeeId, isOnsite } = req.body;
  let query: string = `UPDATE Guests SET FirstName = "${firstName}", EmployeeId = "${employeeId}", IsOnsite = ${isOnsite} WHERE GuestId = "${id}"`;
  SendRequest(req, res, query);
};

const deleteGuest = (req: Request, res: Response) => {
  const id: string = req.params.id;
  let query: string = `DELETE FROM Guests WHERE GuestId = "${id}"`;
  SendRequest(req, res, query);
};

const updateAbsence = (req: Request, res: Response) => {
  const id: string = req.params.id;
  let { isOnsite } = req.body;
  let query: string = `UPDATE Guests SET IsOnsite = ${isOnsite} WHERE GuestId = "${id}" `;
  SendRequest(req, res, query);
};

const getGuestsByEmployee = (req: Request, res: Response) => {
  const id: string = req.params.id;
  let query: string = `SELECT * FROM Guests WHERE EmployeeId = "${id}"`;
  SendRequest(req, res, query);
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
