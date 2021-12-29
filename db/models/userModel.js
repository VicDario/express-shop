const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
	id: {
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.INTEGER
	},
	email: {
		allowNull: false,
		unique: true,
		type: DataTypes.STRING
	},
	password: {
		allowNull: false,
		type: DataTypes.STRING
	},
	role: {
		allowNull: false,
		type: DataTypes.STRING,
		defaultValue: 'customer'
	},
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: 'create_at',
		defaultValue: Sequelize.NOW
	},
	updatedAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: 'update_at',
		defaultValue: Sequelize.NOW
	}
}

class User extends Model {
	static associate(models) {
		this.hasOne(models.Customer, {
			as: 'customer',
			foreignKey: 'user_id'
		})
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: USER_TABLE,
			modelName: 'User',
			timeStamps: false,
		}
	}
}

module.exports = { USER_TABLE, UserSchema, User };
