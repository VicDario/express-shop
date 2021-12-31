const { User, UserSchema } = require('./userModel');
const { Customer, CustomerSchema } = require('./customerModel');
const { Product, ProductSchema } = require('./productModel');
const { Category, CategorySchema } = require('./categoryModel');
const { Order, OrderSchema } = require('./orderModel');
const { OrderProduct, OrderProductSchema } = require('./order-productModel');

function setUpModels(sequelize) {
	User.init(UserSchema, User.config(sequelize));
	Customer.init(CustomerSchema, Customer.config(sequelize));
	Product.init(ProductSchema, Product.config(sequelize));
	Category.init(CategorySchema, Category.config(sequelize));
	Order.init(OrderSchema, Order.config(sequelize));
	OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

	User.associate(sequelize.models);
	Customer.associate(sequelize.models);
	Product.associate(sequelize.models);
	Category.associate(sequelize.models);
	Order.associate(sequelize.models);
	OrderProduct.associate(sequelize.models);
}

module.exports = { setUpModels };
