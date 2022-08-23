import { readFileSync, writeFileSync, promises as fsPromises } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { Employee, Guest } from "./user.interface";
import { Meeting } from "./meeting.interface";

/**
 * flags:
 *  - w = Open file for reading and writing. File is created if not exists
 *  - a+ = Open file for reading and appending. The file is created if not exists
 */

export function syncWriteFile(filename: string, data: any) {
  writeFileSync(join(__dirname, filename), data, {
    flag: "w",
  });

  const contents = readFileSync(join(__dirname, filename), "utf-8");

  return contents;
}

export function syncReadFile(filename: string): string {
  const contents = readFileSync(join(__dirname, filename), "utf-8");

  return contents;
}

export function appendFile(filename: string, data: any): string {
  // Reads the txt file into a string, and appends the new data to the end
  // Not the optimal way to do it, but will be fixed at a later date
  const contents = readFileSync(join(__dirname, filename), "utf-8");
  const newContent: string = contents.concat(data);
  syncWriteFile(filename, newContent);

  return data;
}

export function updateEmployeeFile(
  filename: string,
  empArray: Employee[]
): string {
  let stringToWrite: string = "";

  for (let i = 0; i < empArray.length; i++) {
    let idToCreate: string = "";
    idToCreate =
      i == 0
        ? empArray[i].id.toString() + ","
        : "\n" + empArray[i].id.toString() + ",";
    let nameToCreate: string = empArray[i].name + ",";
    let boolToCreate: string = String(empArray[i].isOnsite) + ",";
    let moodToCreate: string = empArray[i].mood;

    let stringsCombined: string = idToCreate.concat(
      nameToCreate,
      boolToCreate,
      moodToCreate
    );

    stringToWrite += stringsCombined;
  }

  syncWriteFile(filename, stringToWrite);
  return stringToWrite;
}

export function updateGuestFile(fileName: string, guestArray: Guest[]): string {
  let stringToWrite: string = "";

  for (let i = 0; i < guestArray.length; i++) {
    let idToCreate: string = "";
    idToCreate =
      i == 0
        ? guestArray[i].id.toString() + ","
        : "\n" + guestArray[i].id.toString();
    let nameToCreate: string = guestArray[i].name + ",";
    let empIdToCreate: string = guestArray[i].employeeId.toString();

    let stringsCombined: string = idToCreate.concat(
      nameToCreate,
      empIdToCreate
    );

    stringToWrite += stringsCombined;
  }
  syncWriteFile(fileName, stringToWrite);
  return stringToWrite;
}

export function appendJsonFileMeeting(
  fileName: string,
  meetingToCreate: Meeting
): string {
  let jsonString: string = syncReadFile("meetingStore.json");

  console.log(meetingToCreate);
  let meetingsTotal: Meeting[] = JSON.parse(jsonString);
  meetingsTotal.push(meetingToCreate);
  let meetingToWrite: string = JSON.stringify(meetingsTotal);
  syncWriteFile(fileName, meetingToWrite);

  return meetingToWrite;
}

export function updateMeetingFileJson(
  fileName: string,
  meetingArray: Meeting[]
): string {
  let jsonString: string = JSON.stringify(meetingArray);
  syncWriteFile(fileName, jsonString);

  return jsonString;
}
