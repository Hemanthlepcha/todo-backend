// seeders/YYYYMMDDHHMMSS-add-todos.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('todos', [
      {
        id: 1,
        title: 'First Todo',
        description: 'This is the first todo',
        completed: false,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        title: 'Second Todo',
        description: 'This is the second todo',
        completed: false,
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        title: 'Third Todo',
        description: 'This is the third todo',
        completed: true,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('todos', null, {});
  }
};
