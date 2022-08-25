import { v4 as uuidv4 } from "uuid";

const UserQueries = {
  GetAll(): string {
    return "SELECT * FROM Persons WHERE employeeId IS NULL";
  },
  GetById(id: string): string {
    return `SELECT * FROM Persons WHERE personId = "${id}" `;
  },
  CreateUser(
    id: string,
    firstName: string,
    isOnsite: string,
    mood: string
  ): string {
    return `INSERT INTO Persons(personId, FirstName, IsOnsite, Mood) VALUES("${id}", "${firstName}", ${isOnsite}, "${mood}")`;
  },
  UpdateUser(
    id: string,
    firstName: string,
    isOnsite: string,
    mood: string
  ): string {
    return `UPDATE Persons SET FirstName = "${firstName}", IsOnsite = ${isOnsite}, Mood = "${mood}" WHERE personId = "${id}"`;
  },
  DeleteUser(id: string): string {
    return `DELETE FROM Persons WHERE personId = "${id}"`;
  },
};

const GuestQueries = {
  GetAll(): string {
    return "SELECT * FROM Persons WHERE mood IS NULL";
  },
  GetById(id: string): string {
    return `SELECT * FROM Persons WHERE personId = "${id}"`;
  },
  GetGuestByEmployee(id: string): string {
    return `SELECT * FROM Persons WHERE employeeId = "${id}"`;
  },
  CreateGuest(
    id: string,
    firstName: string,
    employeeId: string,
    isOnsite: string
  ): string {
    console.log(id, firstName, employeeId, isOnsite);
    return `INSERT INTO Persons(personId, firstName, employeeId, isOnsite) VALUES("${id}", "${firstName}", "${employeeId}", ${isOnsite} )`;
  },
  UpdateGuest(
    id: string,
    firstName: string,
    employeeId: string,
    isOnsite: string
  ): string {
    return `UPDATE Guests SET FirstName = "${firstName}", EmployeeId = "${employeeId}", IsOnsite = ${isOnsite} WHERE GuestId = "${id}"`;
  },
  UpdateAbsence(id: string, isOnsite: string): string {
    return `UPDATE Guests SET IsOnsite = ${isOnsite} WHERE GuestId = "${id}" `;
  },
  DeleteGuest(id: string): string {
    return `DELETE FROM Guests WHERE GuestId = "${id}"`;
  },
};

const MeetingQueries = {
  CreateMeeting(id: string, timeOfMeeting: Date, participants: string[]) {
    let meetingInsert: string = `INSERT INTO Meetings(meetingId, timeOfMeeting) VALUES('${id}', '${timeOfMeeting}'); `;
    let employeeInsert: string = "";
    for (let i = 0; i < participants.length; i++) {
      let personMeetingId: string = uuidv4();
      employeeInsert += `INSERT INTO PersonMeetings(personMeetingId, personId, meetingId) VALUES('${personMeetingId}', '${participants[i]}', '${id}'); `;
    }
    let queryString: string = meetingInsert.concat(employeeInsert);
    return queryString;
  },
  GetMeetingParticipants(id: string): string {
    let select: string =
      "SELECT timeOfMeeting, personMeetings.personId, firstName FROM Meetings ";
    let innerJoin1: string =
      "INNER JOIN PersonMeetings ON personMeetings.meetingId = meetings.meetingId ";
    let innerJoin2: string =
      "INNER JOIN Persons ON Persons.personId = PersonMeetings.personId ";
    let whereClause: string = `WHERE meetings.meetingId = '${id}'`;

    let queryString: string = select.concat(
      innerJoin1,
      innerJoin2,
      whereClause
    );
    return queryString;
  },
};
// pushcomments
// pushcomments

export { UserQueries, GuestQueries, MeetingQueries };
