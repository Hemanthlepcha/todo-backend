'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Alter the column to primary key
    await queryInterface.changeColumn('todos', 'id', {
      type: Sequelize.INTEGER,
      autoIncrement:true,
      allowNull: false,
      primaryKey: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the column back to its original state if necessary
    await queryInterface.changeColumn('todos', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: false
    });
  }
};
