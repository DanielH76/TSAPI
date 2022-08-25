import { NextFunction, Request, Response } from "express";
import { SendRequest } from "../config/mysql";
import * as Queries from "../config/queries";
import { v4 as uuidv4 } from "uuid";

const getAllMeetings = (req: Request, res: Response) => {};

const getPersonsForMeeting = (req: Request, res: Response) => {
  const id: string = req.params.id;
  SendRequest(req, res, Queries.MeetingQueries.GetMeetingParticipants(id));
};

const createMeeting = (req: Request, res: Response) => {
  const id: string = uuidv4();
  let { timeOfMeeting, participants } = req.body;
  console.log(req.body);
  let query: string = Queries.MeetingQueries.CreateMeeting(
    id,
    timeOfMeeting,
    participants
  );
  console.log(timeOfMeeting);
  SendRequest(req, res, query);
};

export { getAllMeetings, createMeeting, getPersonsForMeeting };
