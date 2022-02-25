const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/login',
	passport.authenticate('local', { session: false }),
	async (req, res, next) => {
		try {
			delete req.user.dataValues.password;
			res.json(req.user);
		} catch (err) {
			next(err);
		}
	}
);

module.exports = router;
