const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

router.post('/login',
	passport.authenticate('local', { session: false }),
	async (req, res, next) => {
		try {
			const { user } = req;
			const payload = {
				id: user.id,
				role: user.role
			}
			const token = jwt.sign(payload, JWT_SECRET);
			res.status(201).json({
				success: true,
				token
			});
		} catch (err) {
			next(err);
		}
	}
);

module.exports = router;
