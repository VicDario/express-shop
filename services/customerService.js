const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize');

class CustomerService {
	constructor() {}

	async find() {
		const result = await models.Customer.findAll({
			include: [{
				model: models.User,
				as: 'user',
			}]
		});
		for (let i = 0; i < result.length; i++) {
			delete result[i].dataValues.user.dataValues.password;
		}
		return result;
	}

	async findOne(id) {
		const result = await models.Customer.findByPk(id);
		if(!result)	throw boom.notFound('Customer not found');
		delete result.dataValues.user.dataValues.password;
		return result;
	}

	async create(data) {
		const hash = await bcrypt.hash(data.password, 10);
		const newData = {
			...data,
			user: {
				...data.user,
				password: hash
			}
		}
		const newCustomer = await models.Customer.create(newData, {
			include: ['user']
		});
		delete newCustomer.dataValues.user.dataValues.password;
		return newCustomer;
	}

	async update(id, changes) {
		const model = await this.findOne(id);
		const result = await model.update(changes);
		delete result.dataValues.user.dataValues.password;
		return result;
	}

	async delete(id) {
		const model = await this.findOne(id);
		await model.destroy();
		return { result: 'success' };
	}
 }

 module.exports = CustomerService;
