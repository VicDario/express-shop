const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class CategoryService {

	constructor() {}

	async create(data) {
		const newCategory = await models.Category.create(data);
		return newCategory;
	}

	async find() {
		const result = await models.Category.findAll({
			include: ['products']
		});
		return result;
	}

	async findOne(id) {
		const category = await models.Category.findByPk(id, {
			include: ['products']
		})
		if(!category)	throw boom.notFound('Category not found');
		return category;
	}

	async update(id, changes) {
		const category = await this.findOne(id);
		const result = await category.update(changes);
		return result;
	}

	async delete(id) {
		const category = await this.findOne(id);
		category.destroy();
		return {success: true};
	}
}

module.exports = CategoryService;
