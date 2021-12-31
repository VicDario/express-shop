const boom = require('@hapi/boom');

// const pool = require('../libs/postgres.pool');
const { models } = require('../libs/sequelize');

class ProductService {
	constructor() {
		/*
		* this.pool = pool;
		* this.pool.on('error', (err) => console.error(err)); */
	}

	async create(data) {
		const newProduct = await models.Product.create(data);
		return newProduct;
	}
	async find() {
		const products = await models.Product.findAll({
			include: ['category']
		});
		return products;
	}
	async findOne(id) {
		const product = await models.Product.findByPk(id);
		if(!product)	throw boom.notFound('Product not found');
		return product;
	}
	async update(id, data) {
		const product = await this.findOne(id);
		const result = await product.update(data);
		return result;
	}
	async delete(id) {
		const product = await this.findOne(id);
		product.destroy();
		return {success: true};
	}
}

module.exports = ProductService;
