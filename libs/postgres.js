const { Client } = require('pg');
const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = require('../config');

async function getConnection() {
	const client = new Client({
		host: DB_HOST,
		port: DB_PORT,
		user: DB_USER,
		password: DB_PASS,
		database: DB_NAME
	})
	await client.connect();
	return client;
}

module.exports = getConnection;
