const express = require('express');
const router = express.Router();
const passport = require('passport');
const AuthService = require('../../../services/AuthService');

const service = new AuthService();

router.post('/login',
	passport.authenticate('local', { session: false }),
	async (req, res, next) => {
		try {
			const { user } = req;
			const token = service.signToken(user);
			res.status(201).json({
				success: true,
				token
			});
		} catch (err) {
			next(err);
		}
	}
);

router.post('/recovery',
	async (req, res, next) => {
		try {
			const { email } = req.body;
			const rta = await service.sendMail(email);
			res.status(201).json(rta);
		} catch (error) {
			next(error);
		}
	}
)

router.post('/change-password',
	async (req, res, next) => {
		try {
			const { token, password } = req.body;
			const rta = await service.changePassword(token, password);
			res.status(201).json(rta);
		} catch (error) {
			next(error);
		}
	}
)

module.exports = router;
