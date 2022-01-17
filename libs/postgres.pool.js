const { Pool } = require('pg');
const { NODE_ENV, DB_PORT, DB_USER, DB_PASS, DB_NAME, DATABASE_URL } = require('../config');

let URI = '';
let ssl = false;

if(NODE_ENV === 'production'){
	URI = DATABASE_URL;
	ssl = {
		rejectUnauthorized: false
	}
} else {
	const USER = encodeURIComponent(DB_USER);
	const PASSWORD = encodeURIComponent(DB_PASS);
	URI = `postgresql://${USER}:${PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}

const options = {
	connectionString: URI,
}

if(ssl)	options.ssl = ssl;

const pool = new Pool(options);

module.exports = pool;
