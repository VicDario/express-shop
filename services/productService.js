const boom = require('@hapi/boom');

// const pool = require('../libs/postgres.pool');
const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');

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
	async find(query) {
		const options = {
			include: ['category'],
			where: {}
		}

		const { limit, offset, price, minPrice, maxPrice } = query;
		if(limit)	options.limit = limit;
		if(offset)	options.offset = offset;

		if(price)	options.where.price = price;
		if(minPrice && maxPrice)	options.where.price = {
			[Op.gte]: minPrice,
			[Op.lte]: maxPrice
		};

		const products = await models.Product.findAll(options);
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
