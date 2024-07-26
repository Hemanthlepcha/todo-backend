'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Step 1: Drop existing primary key constraint
    await queryInterface.removeConstraint('todos', 'id');

    // Step 2: Alter the column to add auto-increment
    await queryInterface.changeColumn('todos', 'id', {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true // Ensure it's marked as primary key after altering
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Step 1: Revert the column back to its original state
    await queryInterface.changeColumn('todos', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true // Ensure it's marked as primary key during rollback
    });

    // Step 2: Add back the primary key constraint (if needed)
    await queryInterface.addConstraint('todos', {
      fields: ['id'],
      type: 'primary key',
      name: 'pk'
    });
  }
};
