const express = require('express');
const UserService = require('../services/userService');
const router = express.Router();

const userService = new UserService();

router.get('/users', async (req, res) => {
	const users = await userService.find();
	res.json(users);
});

module.exports = router;
