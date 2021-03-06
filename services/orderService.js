const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrderService {
	constructor() {}

	async create(data) {
		const newOrder = await models.Order.create(data);
		return newOrder;
	}

	async find() {
		const orders = await models.Order.findAll();
		return orders;
	}

	async addItem(data) {
		const newItem = await models.OrderProduct.create(data);
		return newItem;
	}

	async findOne(id) {
		const order = await models.Order.findByPk(id, {
			include: [
				{
					association: 'customer',
					include: ['user']
				},
				'items'
			]
		});
		if (!order)	throw boom.notFound('Order not found');
		return order;
	}

	async findByUser(userId) {
		const orders = await models.Order.findAll({
			where: {
				'$customer.user.id$': userId
			},
			include: [
				{
					association: 'customer',
					include: ['user']
				}
			]
		})
		return orders;
	}

	async update(id, changes) {
		return {
			id,
			...changes,
		};
	}

	async delete(id) {
		const deleted = await models.Order.destroy({
			where: { id }
		});
		if (!deleted) throw boom.notFound('Order not found');
		return deleted;
	}
}

module.exports = OrderService;
