// src/users/guest.service.ts

import { Guest } from "./user.interface";
import * as txtService from "./txt.service";

const guests: Guest[] = loadGuests();

export function loadGuests(): Guest[] {
  let guestStrings: string[] = txtService
    .syncReadFile("./../persistance/guestStore.txt")
    .split("\n");

  let guestsToReturn: Guest[] = new Array();

  for (let i = 0; i < guestStrings.length; i++) {
    let values: string[] = guestStrings[i].split(",");
    let stringValue: string = values[3];
    let boolValue: boolean = /true/i.test(stringValue);

    guestsToReturn[i] = {
      id: parseInt(values[0]),
      name: values[1],
      employeeId: parseInt(values[2]),
      isOnsite: boolValue,
    };
  }

  return guestsToReturn;
}

export function findAll(): Guest[] {
  return guests;
}

export function find(id: number): Guest {
  let guestToReturn: Guest = guests.find((x) => x.id == id) as Guest;
  return guestToReturn;
}

export function getGuestsForEmployee(id: number): Guest[] {
  let guestArray: Guest[] = loadGuests();
  let guestsToReturn: Guest[] = new Array();

  for (let i = 0; i < guestArray.length; i++) {
    if (guestArray[i].employeeId == id) {
      guestsToReturn.push(guestArray[i]);
    }
  }
  return guestsToReturn;
}

export function create(newGuest: Guest): Guest {
  let idToCreate: string = "\n" + newGuest.id;
  let nameToCreate: string = "," + newGuest.name;
  let employeeIdToCreate: string = newGuest.employeeId.toString();
  let isOnsiteToCreate: string = String(newGuest.isOnsite);

  let stringsJoined: string = idToCreate.concat(
    nameToCreate,
    employeeIdToCreate,
    isOnsiteToCreate
  );

  txtService.appendFile("./../persistance/guestStore.txt", stringsJoined);
  loadGuests();
  return newGuest;
}

export function remove(id: number): boolean {
  let tempGuests: Guest[] = findAll();
  let guestToFind: Guest = find(id);

  if (!guestToFind) {
    return false;
  }

  let index: number = tempGuests.indexOf(guestToFind);

  tempGuests.splice(index, 1);

  txtService.updateGuestFile("./../persistance/guestStore.txt", tempGuests);
  loadGuests();

  return true;
}

export function updateGuest(newGuestValues: Guest, id: number): boolean {
  let tempGuests: Guest[] = findAll();

  let guestToUpdate: Guest = find(id);

  if (!guestToUpdate) {
    return false;
  }

  guestToUpdate.name = newGuestValues.name;
  guestToUpdate.employeeId = newGuestValues.employeeId;
  guestToUpdate.isOnsite = newGuestValues.isOnsite;

  let index: number = tempGuests.indexOf(guestToUpdate);
  tempGuests.splice(index, 1, guestToUpdate);

  txtService.updateGuestFile("./../persistance/guestStore.txt", tempGuests);

  loadGuests();

  return true;
}

export function updateAbsence(id: number): boolean {
  let guests: Guest[] = findAll();
  let guestToUpdate: Guest = find(id);

  guestToUpdate.isOnsite == true ? false : true;

  let index: number = guests.indexOf(guestToUpdate);

  guests.splice(index, 1, guestToUpdate);
  txtService.updateGuestFile("./../persistance/guestStore.txt", guests);

  loadGuests();

  return guestToUpdate.isOnsite;
}
