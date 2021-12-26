const { DB_USER, DB_PASS } = require('../config');

const USER = encodeURIComponent(DB_USER);
const PASSWORD = encodeURIComponent(DB_PASS);
const URI = `postgresql://${USER}:${PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

module.exports = {
	development: {
		url: URI,
		dialect: 'postgres',
	},
	production: {
		url: URI,
		dialect: 'postgres',
	}
}
