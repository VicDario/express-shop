const Joi = require('joi');

const password = Joi.string().pattern(
	new RegExp('"^(?=.*[A-Za-z])(?=.*)(?=.*[@$!%*#?&])[A-Za-z@$!%*#?&]{8,}$"')
);
const email = Joi.string().email();
const token = Joi.string();

const loginSchema = Joi.object({
	email: email.required(),
	password: password.required(),
});

const recoveryPasswordSchema = Joi.object({
	email: email.required(),
});

const changePasswordSchema = Joi.object({
	password: password.required(),
	token: token.required(),
});

module.exports = {
	loginSchema,
	recoveryPasswordSchema,
	changePasswordSchema,
};
