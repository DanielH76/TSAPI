/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";

import * as MeetingService from "./../modules/meeting.service";

import { Meeting } from "./../modules/meeting.interface";

export const meetingRouter = express.Router();

meetingRouter.get("/", async (req: Request, res: Response) => {
  MeetingService.loadMeetings();
  return res.status(200).send("Check logs");
});

meetingRouter.get("/:id", async (req: Request, res: Response) => {});

meetingRouter.post("/", async (req: Request, res: Response) => {
  let meetingToCreate: Meeting = req.body;
  meetingToCreate.id = new Date().valueOf();
  try {
    let isCreated: boolean = MeetingService.create(meetingToCreate);
    console.log(isCreated);
    if (isCreated) {
      return res.status(200).send("Meeting has beed created");
    } else {
      return res.status(500).send("Something went wrong");
    }
  } catch {
    return res.status(500).send("Internal server error");
  }
});

meetingRouter.delete("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  try {
    let isDeleted: boolean = MeetingService.deleteMeeting(id);
    if (isDeleted) {
      return res.status(200).send("Meeting has been deleted");
    } else {
      return res.status(500).send("Something went wrong");
    }
  } catch {
    return res.status(500).send("Internal server error");
  }
});

meetingRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const newValues: Meeting = req.body;
  try {
    let isUpdated: boolean = MeetingService.updateMeeting(id, newValues);
    if (isUpdated) {
      return res.status(200).send("Meeting has been updated");
    } else {
      return res.status(500).send("Meeting not found");
    }
  } catch {
    return res.status(500).send("Internal server error");
  }
});
