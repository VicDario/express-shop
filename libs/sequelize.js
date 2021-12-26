const { Sequelize } = require('sequelize');
const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = require('../config');
const { setUpModels } = require('../db/models');

const USER = encodeURIComponent(DB_USER);
const PASSWORD = encodeURIComponent(DB_PASS);
const URI = `mysql://${USER}:${PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const sequelize = new Sequelize(URI, {
	dialect: 'mysql',
	loggin: true,
});

setUpModels(sequelize);

sequelize.sync();

module.exports = sequelize;
