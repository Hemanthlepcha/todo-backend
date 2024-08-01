// models/todo.js

import { pg, DataTypes } from "../../helper/squelize.js";

const Todo = pg.define(
  "todo",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users", // Name of the Users table
        key: "id",
      },
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    paranoid: true,
    timestamps: true, // Ensure timestamps are enabled
    deletedAt: "deletedAt", // Specify the column name for soft deletes
  }
);
// Todo.addScope("deleted", {
//   where: {
//     deletedAt: null,
//   },
// });

Todo.associate = (models) => {
  Todo.belongsTo(models.User, {
    foreignKey: "UserId",
    onDelete: "CASCADE",
  });
};

export default Todo;
