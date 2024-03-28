import { Button, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite/next";

export default function Testing() {
  const db = useSQLiteContext();
  const setGoals = async () => {
    db.withTransactionAsync(async () => {
      await db.runAsync(
        `INSERT INTO Sheep (name, description) VALUES (?, ?)
            `,
        ["babaa", "Pass interview at Wiley Edge"]
      );
      console.log("sheep added");
    });
  };

  const getSheep = async () => {
    db.withTransactionAsync(async () => {
      const result = await db.runAsync(`SELECT * FROM Sheep;`);
      console.log(result);
    });
  };

  return (
    <View>
      <Button title="getsheep" onPress={getSheep} />
      <Button title="goals" onPress={setGoals} />
    </View>
  );
}
