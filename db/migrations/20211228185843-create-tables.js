'use strict';

const { UserSchema, USER_TABLE } = require('../models/userModel');
const { CustomerSchema, CUSTOMER_TABLE } = require('../models/customerModel');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
