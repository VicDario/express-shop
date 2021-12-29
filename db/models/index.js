const { User, UserSchema } = require('./userModel');
const { Customer, CustomerSchema } = require('./customerModel');

function setUpModels(sequelize) {
	User.init(UserSchema, User.config(sequelize));
	Customer.init(CustomerSchema, Customer.config(sequelize));
}

module.exports = { setUpModels };
