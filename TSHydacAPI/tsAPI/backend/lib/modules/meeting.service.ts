// src/users/meeting.service.ts

import { Meeting } from "./meeting.interface";
import * as txtService from "./txt.service";
import { Employee } from "./user.interface";

const meetings: Meeting[] = loadMeetings();

export function loadMeetings(): Meeting[] {
  let jsonString: string = txtService.syncReadFile(
    "./../persistance/meetingStore.json"
  );

  let meetingsToLoad: Meeting[] = JSON.parse(jsonString);
  return meetingsToLoad;
}

export function find(id: number): Meeting {
  let meetingsTotal: Meeting[] = loadMeetings();
  let meetingToFind: Meeting = meetingsTotal.find((x) => x.id == id) as Meeting;
  return meetingToFind;
}

export function create(meetingToCreate: Meeting): boolean {
  txtService.appendJsonFileMeeting(
    "./../persistance/meetingStore.json",
    meetingToCreate
  );
  loadMeetings();
  return true;
}

export function deleteMeeting(id: number): boolean {
  let meetingsTotal: Meeting[] = loadMeetings();
  let meetingToDelete: Meeting = meetingsTotal.find(
    (x) => x.id == id
  ) as Meeting;

  let index: number = meetingsTotal.indexOf(meetingToDelete);

  if (index == -1) {
    return false;
  }

  meetingsTotal.splice(index, 1);

  txtService.updateMeetingFileJson(
    "./../persistance/meetingStore.json",
    meetingsTotal
  );
  loadMeetings();
  return true;
}

export function updateMeeting(id: number, newValues: Meeting): boolean {
  let meetingsTotal: Meeting[] = loadMeetings();
  let meetingToUpdate: Meeting = find(id);

  if (meetingToUpdate.id != newValues.id) {
    return false;
  }
  if (!meetingToUpdate) {
    return false;
  }

  meetingToUpdate = newValues;

  let index: number = meetingsTotal.indexOf(find(id));
  meetingsTotal.splice(index, 1, meetingToUpdate);

  txtService.updateMeetingFileJson(
    "./../persistance/meetingStore.json",
    meetingsTotal
  );
  loadMeetings();

  return true;
}

export function findMeetingsForEmployee(id: number): Meeting[] {
  let meetingsTotal: Meeting[] = loadMeetings();
  let meetingsContainingEmp: Meeting[] = new Array();

  for (let i = 0; i < meetingsTotal.length; i++) {
    if (meetingsTotal[i].employeeParticipants.includes(id)) {
      meetingsContainingEmp.push(meetingsTotal[i]);
    }
  }
  return meetingsContainingEmp;
}
