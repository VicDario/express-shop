const { Sequelize } = require('sequelize');
const { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, DATABASE_URL } = require('../config');
const { setUpModels } = require('../db/models');

const USER = encodeURIComponent(DB_USER);
const PASSWORD = encodeURIComponent(DB_PASS);
let URI = '';

const options = {
	dialect: 'postgres',
	loggin: NODE_ENV === 'production' ? false : true,
	SSL: {
		rejectUnauthorized: false
	}
}

if(NODE_ENV === 'production'){
	URI = DATABASE_URL;
	options.ssl = {
		rejectUnauthorized: false
	}
}else	URI = `postgresql://${USER}:${PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;


const sequelize = new Sequelize(URI, {
	dialect: 'postgres',
	...options
});

setUpModels(sequelize);

//sequelize.sync();

module.exports = sequelize;
