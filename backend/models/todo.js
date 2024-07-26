// models/todo.js
const Todo = (sequelize, DataTypes) => {
  const Todo = sequelize.define('todo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', // Name of the Users table
        key: 'id'
      }
    },
    
  },{
    paranoid: true,
    timestamps: true, // Ensure timestamps are enabled
    deletedAt: 'deletedAt', // Specify the column name for soft deletes
  });
  
  Todo.addScope('deleted',{
    where:{
      deletedAt:null
    }
  
})
  Todo.associate = (models) => {
    Todo.belongsTo(models.User, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });
  };

  return Todo;
};

export default Todo;
