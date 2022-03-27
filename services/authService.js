const UserService = require('./userService');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const {
	JWT_SECRET,
	RECOVERY_SECRET,
	EMAIL_SENDER,
	EMAIL_PASSWORD,
	FRONTEND_URL,
} = require('../config');

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
			role: user.role,
		};
		const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
		return token;
	}

	async sendRecovery(email) {
		const user = await service.findByEmail(email);
		if (!user) throw boom.unauthorized();
		const payload = { sub: user.id };
		const token = jwt.sign(payload, RECOVERY_SECRET, { expiresIn: '15m' });
		const link = `${FRONTEND_URL}/recovery?token=${token}`;
		await service.update(user.id, { recoveryToken: token });
		const mail = {
			from: EMAIL_SENDER,
			to: user.email,
			subject: 'Recovery password',
			text: 'Hey, you have requested a password recovery. Please click on the link below to reset your password. ${link}',
			html: `<p>Hey, you have requested a password recovery. Please click on the link below to reset your password.</p>
				   <p><a href="${link}">Click here.</a></p>`,
		};
		const response = await this.sendMail(mail);
		return response;
	}

	async changePassword(token, password) {
		const payload = jwt.verify(token, RECOVERY_SECRET);
		const user = await service.findOne(payload.sub);
		if (user.recoveryToken !== token) throw boom.unauthorized();
		const hash = await bcrypt.hash(password, 10);
		await service.update(user.id, { password: hash, recoveryToken: null });
		const mail = {
			from: EMAIL_SENDER,
			to: user.email,
			subject: 'Password changed',
			text: 'Hey, your password has been changed. You can now login with your new password.',
			html: `<p>Hey, your password has been changed. You can now login with your new password.</p>`,
		};
		await this.sendMail(mail);
		return { message: 'Password changed', status: 'success' };
	}

	async sendMail(mail) {
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			secure: true,
			port: 465,
			auth: {
				user: EMAIL_SENDER,
				pass: EMAIL_PASSWORD,
			},
		});
		await transporter.sendMail(mail);
		return { message: 'Email sent', status: 'success' };
	}
}

module.exports = AuthService;
