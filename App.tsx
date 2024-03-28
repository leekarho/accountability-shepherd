import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { useEffect } from "react";
import { Asset } from "expo-asset";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite/next";
import Testing from "./components/Testing";

async function loadDatabase() {
  const dbName = "shepherd.db";
  const dbAsset = require("./assets/shepherd.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (!fileInfo.exists) {
    console.log("hello");

    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
}


export default function App() {
  // const db = useSQLiteContext()
  const dbAsset = require("./assets/shepherd.db");
  const db = dbAsset

  useEffect(() => {
    loadDatabase().then(() => {});
  }, []);
  
  const setGoals = async () => {
    db.withTransactionAsync(async () => {
      await db.runAsync(
        `INSERT INTO Sheep (name, description) VALUES (?, ?)
        `, ["babaa", "Pass interview at Wiley Edge"]
      )
      console.log("sheep added");
      
    })
  };

  return (
    <>
      <SQLiteProvider databaseName="shepherd.db">
        <View style={styles.container}>
          <Text>
            Hello world
          </Text>
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
