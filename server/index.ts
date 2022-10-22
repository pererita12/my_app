import express from "express";
import cors from "cors";
import mysql from "mysql2";
import digimonJson from "./resources/digimon.json";
import {
  connectToDatabase,
  connectToSQL,
  executeQuery,
  insertRowInDatabaseTable,
} from "./database/methods";

const createDatabase = () => {
  return new Promise<void>(async (res, rej) => {
    const sql = connectToSQL();
    await executeQuery(sql, `CREATE DATABASE IF NOT EXISTS digimon`);
    sql.end();
  });
};

const createTable = () => {
  return new Promise<void>(async (res, rej) => {
    const digimonDb = await connectToDatabase("digimon");
    await executeQuery(
      digimonDb,
      `CREATE TABLE IF NOT EXISTS list (
      id int AUTO_INCREMENT PRIMARY KEY,
      name varchar(255),
      level varchar(255),
      img varchar(255)
    )`
    );
    for (const digimon of digimonJson) {
      await insertRowInDatabaseTable(
        digimonDb,
        "list",
        `'${digimon.name}', '${digimon.level}', '${digimon.img}'`
      );
    }
    digimonDb.end();
    res();
  });
};

const main = async () => {
  await createDatabase();
  await createTable();
};

main();

const app = express();
const port = 4000;
const allowedOrigins = ["http://localhost:3000", "http://localhost:8080"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.get("/api/digimon", async (request, response) => {
  const digimonDb = await connectToDatabase("digimon");
  const data = await executeQuery(digimonDb, `SELECT * FROM list;`);
  response.send(data);
  response.end();
});

app.listen(port, () => {
  console.log(`SERVER LISTENING AT PORT ${port}`);
});
