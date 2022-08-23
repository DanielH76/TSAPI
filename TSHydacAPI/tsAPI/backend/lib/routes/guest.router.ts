/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";

import * as GuestService from "./../modules/guest.service";

import { Guest } from "./../modules/user.interface";

import * as GuestController from "./../controllers/guest.controller";

/**
 * Router Definition
 */

export const guestRouter = express.Router();

/**
 * Controller Definitions
 */

// GET ALL GUESTS
/* guestRouter.get("/", async (req: Request, res: Response) => {
  try {
    const guests: Guest[] = GuestService.findAll();
    if (guests) {
      res.status(200).send(guests);
    } else {
      res.status(404).send("Something went wrong");
    }
  } catch {
    res.status(500).send("Error 500");
  }
}); */

guestRouter.get("/", GuestController.getAllGuests);

//GET SPECIFIC GUEST

/* guestRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const guestToReturn: Guest = GuestService.find(id);

    if (guestToReturn) {
      return res.status(200).send(guestToReturn);
    }

    res.status(404).send("Guest not found");
  } catch {
    res.status(500).send("Internal server error");
  }
}); */

guestRouter.get("/:id", GuestController.getGuest);

// CREATE GUEST

/* guestRouter.post("/", async (req: Request, res: Response) => {
  let id: number = new Date().valueOf();
  console.log(id);

  try {
    const guest: Guest = req.body;
    guest.id = id;

    const newGuest = GuestService.create(guest);

    res.status(200).send(newGuest);
  } catch {
    res.status(500).send("Internal server error");
  }
}); */

guestRouter.post("/", GuestController.createGuest);

// UPDATE GUEST

/* guestRouter.put("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  let updatedGuest = req.body;

  try {
    let isUpdated: boolean = GuestService.updateGuest(updatedGuest, id);

    if (isUpdated) {
      return res.status(200).send("Guest has been updated");
    } else {
      return res.status(404).send("Guest not found");
    }
  } catch {
    res.status(500).send("Internal server error");
  }
}); */

guestRouter.put("/:id", GuestController.updateGuest);

// DELETE GUEST
/* guestRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    let isDeleted: boolean = GuestService.remove(id);

    if (isDeleted) {
      return res.status(200).send("Guest has been removed");
    } else {
      return res.status(500).send("Something went wrong");
    }
  } catch {
    return res.status(500).send("Internal server error");
  }
}); */

guestRouter.delete("/:id", GuestController.deleteGuest);

/* guestRouter.get("/employee/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    let guestsToReturn: Guest[] = GuestService.getGuestsForEmployee(id);
    if (guestsToReturn.length <= 0) {
      return res.status(200).send("Employee has no guests connected");
    }
    if (guestsToReturn) {
      return res.status(200).send(guestsToReturn);
    } else {
      return res.status(404).send("Guests not found. Perhaps ID is wrong?");
    }
  } catch {
    return res.status(500).send("Internal server error");
  }
}); */

guestRouter.get("/byEmployee/:id", GuestController.getGuestsByEmployee);

/* guestRouter.put("/absence/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    let absence: boolean = GuestService.updateAbsence(id);
    return res.status(200).send(absence);
  } catch {
    return res.status(500).send("Internal server error");
  }
});
 */

guestRouter.put("/updateAbsence/:id", GuestController.updateAbsence);
