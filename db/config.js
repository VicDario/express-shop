const { DATABASE_URL } = require('../config');

module.exports = {
	development: {
		url: DATABASE_URL,
		dialect: 'postgres',
	},
	production: {
		url: DATABASE_URL,
		dialect: 'postgres',
		dialectOptions: {
			ssl: {
				rejectUnauthorized: false
			}
		}
	}
}
