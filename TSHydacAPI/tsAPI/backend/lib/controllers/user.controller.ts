import { NextFunction, Request, Response } from "express";
import { SendRequest } from "../config/mysql";
import * as Queries from "../config/queries";
import { v4 as uuidv4 } from "uuid";
import * as sqlize from "./../config/sequelize";
import { Person, Employee } from "./../modules/user.interface";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  let employeesToFind: Promise<Employee[]> = await sqlize.Persons.findAll({
    attributes: ["personId", "firstName", "isOnsite", "mood"],
    where: {
      employeeId: null,
    },
  });

  return res.status(200).json(employeesToFind);

  //SendRequest(req, res, Queries.UserQueries.GetAll());
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  let employeeToFind: Promise<Employee> = await sqlize.Persons.findAll({
    attributes: ["personId", "firstName", "isOnsite", "mood"],
    where: {
      personId: req.params.id,
    },
  });

  return res.status(200).json(employeeToFind);
  //SendRequest(req, res, Queries.UserQueries.GetById(req.params.id));
};

const createUser = async (req: Request, res: Response) => {
  let { firstNamee, isOnsitee, moodd } = req.body;
  let id = uuidv4();
  console.log(req.body);
  console.log(id);
  // let query = Queries.UserQueries.CreateUser(id, firstName, isOnsite, mood);

  const personToCreate: Promise<Employee> = await sqlize.Persons.create({
    personId: id,
    firstName: firstNamee,
    isOnsite: isOnsitee,
    mood: moodd,
  });

  return res.status(200).json(personToCreate);

  // SendRequest(req, res, query);
};

const updateUser = async (req: Request, res: Response) => {
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
