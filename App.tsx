import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { useEffect } from "react";
import { Asset } from "expo-asset";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite/next";
import Testing from "./components/Testing";

// async function loadDatabase() {
//   const dbName = "shepherd.db";
//   const dbAsset = require("./assets/shepherd.db");
//   const dbUri = Asset.fromModule(dbAsset).uri;
//   const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

//   const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
//   if (!fileInfo.exists) {
//     console.log("hello");

//     await FileSystem.makeDirectoryAsync(
//       `${FileSystem.documentDirectory}SQLite`,
//       { intermediates: true }
//     );
//     await FileSystem.downloadAsync(dbUri, dbFilePath);
//   }

//  const db = SQLite.openDatabase("shepherd.db");

//  db.TransactionAsync(async () => {
//   await db.runAsync(
//     `CREATE TABLE Sheep IF DOES NOT EXISTS (sheep_id INTEGER PRIMARY KEY NOT NULL, name VARCHAR, description VARCHAR);
//     `,
//     []
//   );
//   console.log("table created???");
// });
// }

export default function App() {
  // const db = useSQLiteContext()
  // const dbAsset = require("./assets/shepherd.db");
  // const db = dbAsset;

  // useEffect(() => {
  //   loadDatabase().then(() => {
  //     db.withTransactionAsync(async () => {
  //       await db.runAsync(
  //         `CREATE TABLE Sheep IF DOES NOT EXISTS (sheep_id INTEGER PRIMARY KEY NOT NULL, name VARCHAR, description VARCHAR);
  //         `,
  //         []
  //       );
  //       console.log("table created???");
  //     });
  //   });
  // }, []);
  // async function createTable(database: any) {
  //   const readOnly = true;
  //   await database.transactionAsync(async (tx: any) => {
  //     const result = await tx.executeSqlAsync(
  //       `CREATE TABLE IF NOT EXISTS Sheep (
  //         sheep_id INTEGER PRIMARY KEY,
  //         name VARCHAR(50),
  //         description VARCHAR(50),
  //         personality VARCHAR(50),
  //         joke_category VARCHAR(50),
  //         status VARCHAR(50),
  //         skin VARCHAR(50),
  //         frequency INT,
  //         health_timer INT,
  //         days_since_fed DATE,
  //         death_date DATE
  //     );`
  //     );
  //     // console.log("Count:", result.rows[0]["COUNT(*)"])
  //     console.log("hii");
  //   }, readOnly);
  // }

  function createTable(database: any) {
    const readOnly = true;
    database.transaction((tx: any) => {
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
    }, readOnly);
  }

  const db = SQLite.openDatabase("shepherd.db");

  useEffect(() => {
    // createTable(db).then(() => {
    //   console.log("table created");
    // });
    createTable(db);
  }, []);

  // const setGoals = async (db) => {
  //   db.transaction(async () => {
  //     await db.executeSQLAsync(
  //       `INSERT INTO Sheep (name, description) VALUES (?, ?)
  //       `,
  //       ["babaa", "Pass interview at Wiley Edge"]
  //     );
  //     console.log("sheep added");
  //   });
  // };

  return (
    <>
      <SQLiteProvider databaseName="shepherd.db">
        <View style={styles.container}>
          <Text>Hello world</Text>
          <Testing />

          <StatusBar style="auto" />
        </View>
      </SQLiteProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
