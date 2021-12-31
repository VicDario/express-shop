'use strict';

const { OrderSchema, ORDER_TABLE } = require('../models/orderModel');

module.exports = {
	up: async (queryInterface) => {
		await queryInterface.createTable(ORDER_TABLE, OrderSchema);
	},

	down: async (queryInterface) => {
		await queryInterface.dropTable(ORDER_TABLE);
	},
};
