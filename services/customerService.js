const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class CustomerService {
	constructor() {}

	async finds() {
		const result = await models.Customer.findAll();
		return result;
	}

	async findOne(id) {
		const result = await models.Customer.findByPk(id);
		if(!result)	throw boom.notFound('Customer not found');
		return result;
	}

	async create(data) {
		return data;
	}

	async update(id, changes) {
		const model = await this.findOne(id);
		const result = await model.update(changes);
		return result;
	}

	async delete(id) {
		const model = await this.findOne(id);
		await model.destroy();
		return { result: 'success' };
	}
 }

 module.exports = CustomerService;
