const { Sequelize } = require('sequelize');
const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = require('../config');

const USER = encodeURIComponent(DB_USER);
const PASSWORD = encodeURIComponent(DB_PASS);
const URI = `postgresql://${USER}:${PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const sequelize = new Sequelize(URI, {
	dialect: 'postgres',
	loggin: true,
});

module.exports = sequelize;
