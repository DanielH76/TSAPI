// src/users/meeting.interface.ts

export interface Meeting {
  id: number;
  timeOfMeeting: Date;
  employeeParticipants: number[];
  guestParticipants: number[];
}
