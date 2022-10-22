import mysql from "mysql2";

export const connectToSQL = () => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
  });
  return connection;
};

export const executeQuery = (db: mysql.Connection, query: string) => {
  return new Promise((res, rej) => {
    db.query(query, (error, results) => {
      res(results);
    });
  });
};

export const connectToDatabase = (databaseName: string) => {
  return new Promise<mysql.Connection>((res, rej) => {
    const db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: databaseName,
    });
    db.connect((error) => {
      res(db);
    });
  });
};

export const insertRowInDatabaseTable = (
  db: mysql.Connection,
  tableName: string,
  values: string
) => {
  return new Promise((res, rej) => {
    db.query(
      `INSERT INTO ${tableName} VALUES (0, ${values})`,
      (error, results) => {
        res(results);
      }
    );
  });
};
