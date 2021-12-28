'use strict';

const { UserSchema, USER_TABLE } = require('../../db/models/userModel');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);
  },

  down: async (queryInterface, Sequelize) => {
	await queryInterface.removeColumn(USER_TABLE, 'role');
  }
};
