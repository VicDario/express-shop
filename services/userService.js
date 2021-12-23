const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class UserService {
	constructor() {
		/* this.pool = pool;
		this.pool.on('error', (err) => console.error(err)); */
	}

	async create(data) {
		return data;
	}

	async find() {
		const result = await models.User.findAll();
		return result;
	}

	async findOne(id) {
		return { id };
	}

	async update(id, changes) {
		return {
			id,
			changes,
		};
	}

	async delete(id) {
		return { id };
	}
}

module.exports = UserService;
