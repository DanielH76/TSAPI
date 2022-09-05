// src/users/user.interface.ts

/* export interface Person {
  id: string;
} */

export interface Employee extends Person {
  /*  id: string;
  name: string;
  isOnsite: boolean; */
  mood: Mood;
}

export interface Guest extends Person {
  /*   id: string;
  name: string; */
  employeeId: number;
  //isOnsite: boolean;
}

export interface Person {
  id: string;
  name: string;
  isOnsite: boolean;
}

export type Mood = "Happy" | "Sad" | "Neutral" | "ANGRY";
