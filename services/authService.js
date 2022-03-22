const UserService = require('./userService');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { JWT_SECRET, EMAIL_SENDER, EMAIL_PASSWORD } = require('../config');

const service = new UserService();

class AuthService {

	async getUser(email, password) {
		const user = await service.findOne({ email });
		if (!user) throw boom.unauthorized();
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) throw boom.unauthorized();
		delete user.dataValues.password;
		return user;
	}

	signToken(user) {
		const payload = {
			sub: user.id,
			role: user.role
		};
		const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
		return token;
	}

	async sendMail(email) {
		const user = await service.findByEmail(email);
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			secure: true,
			port: 465,
			auth: {
				user: EMAIL_SENDER,
				pass: EMAIL_PASSWORD
			}
		});
		await transporter.sendMail({
			from: EMAIL_SENDER,
			to: user.email,
			subject: "Recovery password",
			text: "Hey, you have requested a password recovery. Please click on the link below to reset your password.",
			html: `<p>Hey, you have requested a password recovery. Please click on the link below to reset your password.</p>`
		});

		return { message: 'Email sent' };
	}
}

module.exports = AuthService;
