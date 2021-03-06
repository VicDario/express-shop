const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const price = Joi.number().min(0);
const description = Joi.string().min(10);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();
const minPrice = Joi.number().min(0);
const maxPrice = Joi.number().min(0);

const createProductSchema = Joi.object({
	name: name.required(),
	price: price.required(),
	description: description.required(),
	image: image.required(),
	categoryId: categoryId.required(),
});
const updateProductSchema = Joi.object({
	name,
	price,
	image,
	description,
	categoryId
});
const getProductSchema = Joi.object({
	id: id.required()
});
const queryProductSchema = Joi.object({
	limit,
	offset,
	price,
	minPrice,
	maxPrice: maxPrice.when('minPrice', {
		is: Joi.exist(),
		then: maxPrice.required(),
	})
});

module.exports = {
	createProductSchema,
	updateProductSchema,
	getProductSchema,
	queryProductSchema
};
