'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('todos', 'UserId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users', // Name of the Users table
        key: 'id'
      },
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('todos', 'UserId');
  }
};
