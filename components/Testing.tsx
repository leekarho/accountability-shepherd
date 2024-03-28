import { Button, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite/next";

export default function Testing() {
  const db = useSQLiteContext();
  console.log(db);
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

  const deleteSheep = async () => {
    db.withTransactionAsync(async () => {
      await db.runAsync(`DELETE FROM Sheep where sheep_id = ?`, [4]);
    });
  };

  // const getSheep = async () => {
  //   // db.withTransactionAsync(async () => {
  //   //   const result = await db.runAsync(`SELECT * FROM Sheep;`);
  //   //   console.log(result);
  //   // });
  //   // const readOnly = true;
  //   // await db.withTransactionAsync(async (tx) => {
  //   //   const result = await tx.executeAsync("SELECT * FROM Sheep", true);
  //   //   // console.log('Count:', result.rows[0]['COUNT(*)']);
  //   //   console.log(result);
  //   //   console.log("???");
  //   });
  // };

  const getSheep = async (db: any) => {
    const query = `SELECT * FROM Sheep`;
    try {
      const results = await db.getAllAsync(query);
      // if (results[0]?.rows?.length) {
      //   return results[0].rows.item(0)
      // } else {
      //   return null
      // }
      console.log(results);
      return results;
    } catch (error) {
      console.error(error);
      throw Error("Failed to get sheep from database");
    }
  };

  return (
    <View>
      <Button title="getsheep" onPress={() => getSheep(db)} />
      <Button title="goals" onPress={setGoals} />
      <Button title="delete" onPress={deleteSheep} />
    </View>
  );
}
