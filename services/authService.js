const UserService = require('./userService');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { JWT_SECRET, EMAIL_SENDER, EMAIL_PASSWORD, FRONTEND_URL } = require('../config');

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

	async sendRecovery(email) {
		const user = await service.findByEmail(email);
		if (!user) throw boom.unauthorized();
		const payload = { sub: user.id };
		const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
		const link = `${FRONTEND_URL}/recovery?token=${token}`;
		await service.update(user.id, { recoveryToken: token });
		const mail = {
			from: EMAIL_SENDER,
			to: user.email,
			subject: "Recovery password",
			text: "Hey, you have requested a password recovery. Please click on the link below to reset your password. ${link}",
			html: `<p>Hey, you have requested a password recovery. Please click on the link below to reset your password.</p>
				   <p><a href="${link}">Click here.</a></p>`
		}
		const response = await this.sendMail(mail);
		return response;
	}

	async sendMail(mail) {
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			secure: true,
			port: 465,
			auth: {
				user: EMAIL_SENDER,
				pass: EMAIL_PASSWORD
			}
		});
		await transporter.sendMail(mail);

		return { message: 'Email sent' };
	}
}

module.exports = AuthService;
