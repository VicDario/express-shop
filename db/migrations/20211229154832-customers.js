'use strict';
const { DataTypes } = require('sequelize');
const { CUSTOMER_TABLE }  = require('../models/customerModel');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
		allowNull: false,
		type: DataTypes.INTEGER,
		unique: true,
		field: 'user_id'
	});
  },

  down: async (queryInterface) => {
    // await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
