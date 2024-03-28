import * as SQLite from "expo-sqlite";

// Open or create the database
const db = SQLite.openDatabase("shepherd.db");

const initDatabase = () => {
  db.transactionAsync(async (tx) => {
    await tx.executeSqlAsync(
      `
        CREATE TABLE IF NOT EXISTS Sheep (
            sheep_id SERIAL PRIMARY KEY,
            name VARCHAR,
            description VARCHAR,
            personality VARCHAR,
            joke_category VARCHAR,
            status VARCHAR,
            skin VARCHAR,
            frequency INT,
            health_timer INT,
            days_since_fed DATE,
            death_date DATE
        )`,
      []
      //   () => {console.log("Table created")},
      //   (error) => {
      //     console.log("error", error);
      //     reject(error)
      //   }
    );
  });
};
