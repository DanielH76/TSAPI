import mysql from "mysql";
import config from "./config";
import { NextFunction, Request, Response } from "express";

const params = {
  user: config.mysql.user,
  password: config.mysql.password,
  host: config.mysql.host,
  database: config.mysql.datbase,
};

const Connect = async () =>
  new Promise<mysql.Connection>((resolve, reject) => {
    const connectionn = mysql.createConnection(params);

    connectionn.connect((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(connectionn);
    });
  });

const Query = async (connection: mysql.Connection, query: string) =>
  new Promise((resolve, reject) => {
    connection.query(query, connection, (error, result) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(result);
    });
  });

const SendRequest = (req: Request, res: Response, query: string) => {
  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((results) => {
          return res.status(200).json({
            results,
          });
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).send("Internal server error");
        })
        .finally(() => {
          connection.end();
        });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send("Internal server error");
    });
};

export { Connect, Query, SendRequest };
