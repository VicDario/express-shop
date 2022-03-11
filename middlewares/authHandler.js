const boom = require('@hapi/boom');
const { API_KEY } = require('../config');

function checkApiKey(req, res, next) {
	const { api } = req.headers;
	if (api !== API_KEY) {
		next(boom.unauthorized());
	}
	next();
}

function checkRoles(...roles) {
	return (req, res, next) => {
		if (!roles.includes(req.user.role))	next(boom.unauthorized());
		next();
	}
}

module.exports = { checkApiKey, checkRoles };
