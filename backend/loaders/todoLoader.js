import DataLoader from "dataloader";
import db from "../models/index.js";

// DataLoader setup for batch loading todos by userId
const batchFunction = async (keys) => {
  console.log("keys:", keys);
  const todos = await db.todo.scope("deleted").findAll({
    where: {
      UserId: keys,
    },
  });
  return keys.map((keys) => todos[keys] || new Error(`No result for ${keys}`));
  console.log("todos:", todos);
};

const loader = new DataLoader((keys) => batchFunction(keys));

export default loader;
