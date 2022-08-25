// src/users/meeting.interface.ts

export interface Meeting {
  id: number;
  timeOfMeeting: Date;
  employeeParticipants: string[];
  guestParticipants: string[];
}
