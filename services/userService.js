const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize');

class UserService {
	constructor() {
		/* this.pool = pool;
		this.pool.on('error', (err) => console.error(err)); */
	}

	async create(data) {
		const hash = await bcrypt.hash(data.password, 10);
		const newUser = await models.User.create({
			...data,
			password: hash
		});
		delete newUser.dataValues.password;
		return newUser;
	}

	async find() {
		const result = await models.User.findAll({
			include: ['customer']
		});
		for (let i = 0; i < result.length; i++) {
			delete result[i].dataValues.password;
		}
		return result;
	}

	async findOne(id) {
		const user = await models.User.findByPk(id);
		if(!user) throw boom.notFound('User not found');
		delete user.dataValues.password;
		return user;
	}

	async findByEmail(email) {
		const user = await models.User.findOne({
			where: {
				email
			}
		});
		return user;
	}

	async update(id, changes) {
		const user = await this.findOne(id);
		const result = await user.update(changes);
		delete result.dataValues.password;
		return result;
	}

	async delete(id) {
		const user = await this.findOne(id);
		const result = await user.destroy();
		return result;
	}
}

module.exports = UserService;
