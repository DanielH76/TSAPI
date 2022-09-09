const { Sequelize, DataTypes } = require("sequelize");
import * as config from "./config";

const sequelize = new Sequelize(
  config.default.mysql.datbase,
  config.default.mysql.user,
  config.default.mysql.password,
  {
    host: config.default.mysql.host,
    dialect: "mysql",
  }
);

const Persons = sequelize.define("Persons", {
  personId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isOnsite: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  mood: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  employeeId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const Meetings = sequelize.define("Meetings", {
  meetingId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  timeOfMeeting: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

const PersonMeetings = sequelize.define("PersonMeetings", {
  personMeetingId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  personId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  meetingId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

PersonMeetings.hasOne(Meetings);
PersonMeetings.hasOne(Persons);

const Players = sequelize.define("Players", {
  PlayerId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  Username: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: false,
  },
});

const Games = sequelize.define("Games", {
  GameId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  Score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  AverageTime: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  NumberOfClicks: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  PlayerId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  BestTime: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

const Highscores = sequelize.define("Highscores", {
  HighscoreId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  GameId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  PlayerId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Highscores.hasOne(Players);
Highscores.hasOne(Games);

export const test = () => {
  try {
    sequelize.authenticate();
    console.log("Connection has been established successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { Persons, Meetings, PersonMeetings, Players, Games, Highscores };
