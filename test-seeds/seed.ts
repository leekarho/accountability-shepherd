import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("test-shepherd.db");

export const seed = async (db: any) => {
  await db.transactionAsync(async (tx) => {
    await tx.executeSqlAsync(`DROP TABLE Sheep`, []);
  });
  const readOnly = true;
  db.transaction((tx: any) => {
    const result = tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Sheep (
        sheep_id INTEGER PRIMARY KEY,
        name VARCHAR(50),
        description VARCHAR(50),
        personality VARCHAR(50),
        joke_category VARCHAR(50),
        status VARCHAR(50),
        skin VARCHAR(50),
        frequency INT,
        health_timer INT,
        days_since_fed DATE,
        death_date DATE
      );`
    );
    // console.log("Count:", result.rows[0]["COUNT(*)"])
    console.log("hii");
  });

  db.transactionAsync(async (tx) => {
    await tx.executeSqlAsync(
      `INSERT INTO Sheep (name, description, personality, joke_category, status, skin, frequency, health_timer, days_since_fed, death_date) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `,
      [
        "zaza",
        "Get a job",
        "sassy",
        "programming",
        "active",
        "white",
        3,
        4,
        1586179020000,
        1604113380000,
      ]
    );
    console.log("sheep added");
  });
};
