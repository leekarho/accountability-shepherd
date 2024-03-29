export const getSheep = async (db: any) => {
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