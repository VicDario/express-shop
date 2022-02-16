const boom = require('@hapi/boom');
const { API_KEY } = require('../config');

function checkApiKey(req, res, next) {
	const { api } = req.headers;
	if (api !== API_KEY) {
		next(boom.unauthorized());
	}
	next();
}


module.exports = checkApiKey;
