const { Pool } = require('pg');
const { NODE_ENV, DB_PORT, DB_USER, DB_PASS, DB_NAME, DATABASE_URL } = require('../config');
let URI = '';

if(NODE_ENV === 'production')	URI = DATABASE_URL;
else{
	const USER = encodeURIComponent(DB_USER);
	const PASSWORD = encodeURIComponent(DB_PASS);
	URI = `postgresql://${USER}:${PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}

const pool = new Pool({ connectionString: URI });

module.exports = pool;
