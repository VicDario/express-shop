const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
	const { limit, offset} = req.query;
	if (!limit || !offset) {
		res.status(400).json({
			error: 'Bad request'
		});
	}
	res.json({
		limit,
		offset
	});
});

module.exports = router;
