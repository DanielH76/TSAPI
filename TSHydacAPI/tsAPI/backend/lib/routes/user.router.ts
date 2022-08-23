/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";

import * as UserService from "./../modules/user.service";

import { Employee } from "./../modules/user.interface";

import userController from "./../controllers/user.controller";

import * as crypto from "crypto";
import { rmSync } from "fs";

/**
 * Router Definition
 */

export const userRouter = express.Router();

/**
 * Controller Definitions
 */

// GET EMPLOYEES

userRouter.get("/", userController.getAllUsers);

/* userRouter.get("/", async (req: Request, res: Response) => {
  let dateTest: Date = new Date();
  dateTest.setHours(dateTest.getHours() + 2);
  console.log(dateTest);
  try {
    const employees: Employee[] = UserService.findAll();
    res.status(200).send(employees);
  } catch (e) {
    res.status(500).send("Error 500");
  }
}); */

// GET EMPLOYEE
/* userRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const employeeToReturn: Employee = UserService.find(id);

    if (employeeToReturn) {
      return res.status(200).send(employeeToReturn);
    }

    res.status(404).send("Employee not found");
  } catch (e) {
    res.status(500).send(e);
  }
}); */

userRouter.get("/:id", userController.getUser);

// CREATE EMPLOYEE

/* userRouter.post("/", async (req: Request, res: Response) => {
  const id: number = new Date().valueOf();
  console.log(id);
  try {
    let emp: Employee = req.body;
    emp.id = id;

    const newEmp = UserService.createNew(emp);

    res.status(201).json(newEmp);
  } catch {
    res.status(500).send("Error 500");
  }
}); */

userRouter.post("/", userController.createUser);

// DELETE EMPLOYEE

/* userRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    let isDeleted: boolean = UserService.removeEmployee(id);

    if (isDeleted) {
      return res.status(200).send("User is now deleted");
    }
  } catch {
    res.status(500).send("Error 500");
  }
}); */

userRouter.delete("/:id", userController.deleteUser);

// UPDATE EMPLOYEE

/* userRouter.put("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  let updatedEmployee = req.body;
  updatedEmployee.id = id;

  try {
    let isUpdated: boolean = UserService.updateEmployee(updatedEmployee, id);

    if (isUpdated) {
      return res.status(200).send("User has been updated");
    } else {
      return res.status(404).send("Employee not found");
    }
  } catch {
    res.status(500).send("Error 500");
  }
}); */

userRouter.put("/:id", userController.updateUser);

userRouter.get("/getbyname/:name", async (req: Request, res: Response) => {
  const name = req.params.name;
  try {
    let employeeToReturn: Employee = UserService.findByName(name);

    if (employeeToReturn) {
      return res.status(200).send(employeeToReturn);
    }
    return res.status(404).send("User was not found");
  } catch {
    return res.status(500).send("Internal server error");
  }
});

/* userRouter.get("/database/da/da", async (req: Request, res: Response) => {
  try {
    dbService.FindAll();
    res.status(200).send("Check log");
  } catch {
    res.status(500).send("Internal server error");
  }
}); */
