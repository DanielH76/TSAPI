// src/users/user.service.ts

import { Employee, Mood } from "./user.interface";
import * as txtService from "./txt.service";

const employees: Employee[] = loadEmployees();

export function loadEmployees(): Employee[] {
  let empStrings: string[] = txtService
    .syncReadFile("./../persistance/userStore.txt")
    .split("\n");

  const employeesToReturn: Employee[] = new Array();

  // Runs through all the employee strings in the array, and adds a new
  // employee to the EmployeeArray for each string

  for (let i = 0; i < empStrings.length; i++) {
    let values: string[] = empStrings[i].split(",");

    let stringValue: string = values[2];
    let boolValue: boolean = /true/i.test(stringValue);

    employeesToReturn[i] = {
      id: parseInt(values[0]),
      name: values[1],
      isOnsite: boolValue,
      mood: values[3] as Mood,
    };
  }
  return employeesToReturn;
}

export function createNew(newEmployee: Employee): string {
  let idToCreate: string = "\n" + newEmployee.id.toString() + ",";
  let nameToCreate: string = newEmployee.name + ",";
  let boolToCreate: string = String(newEmployee.isOnsite) + ",";
  let moodToCreate: string = newEmployee.mood;

  let stringsJoined: string = idToCreate.concat(
    nameToCreate,
    boolToCreate,
    moodToCreate
  );

  let test: string = txtService.appendFile(
    "./../persistance/userStore.txt",
    stringsJoined
  );
  loadEmployees();

  return test;
}

export const findAll = (): Employee[] => {
  return employees;
};

export const find = (id: number): Employee => {
  let empToFind: Employee = employees.find((x) => x.id == id) as Employee;
  return empToFind;
};

export const findByName = (name: string): Employee => {
  console.log(employees);
  let employeeToReturn: Employee = employees.find(
    (x) => x.name == name
  ) as Employee;
  console.log(employeeToReturn);
  return employeeToReturn;
};

export function removeEmployee(id: number): boolean {
  let tempEmployee: Employee[] = findAll();

  let employeeToFind: Employee = find(id);

  if (!employeeToFind) {
    return false;
  }

  let index: number = tempEmployee.indexOf(employeeToFind);

  tempEmployee.splice(index, 1);

  txtService.updateEmployeeFile("./../persistance/userStore.txt", tempEmployee);

  loadEmployees();

  return true;
}

export function updateEmployee(
  newEmployeeValues: Employee,
  id: number
): boolean {
  // find employee with id
  let tempEmployee: Employee[] = findAll();
  console.log(tempEmployee);

  let employeeToUpdate: Employee = find(id);

  if (!employeeToUpdate) {
    return false;
  }
  // update employee with new values

  employeeToUpdate.name = newEmployeeValues.name;
  employeeToUpdate.isOnsite = newEmployeeValues.isOnsite;
  employeeToUpdate.mood = newEmployeeValues.mood;
  // replace employee in array

  let index: number = tempEmployee.indexOf(employeeToUpdate);
  tempEmployee.splice(index, 1, employeeToUpdate);

  txtService.updateEmployeeFile("./../persistance/userStore.txt", tempEmployee);

  loadEmployees();

  return true;
}
