const express = require("express");

var router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../User.js");

//for signing in
router.post("/", async (req, res) => {
	console.log(req.body);
	const user = await User.findOne({
		username: req.body.user_name,
		password: req.body.password,
	});
	if (user) {
		console.log("login successful");
		const token = jwt.sign(
			{ username: user.username, admin: user.admin },
			process.env.SECRET_KEY,
		);
		return res.json({
			status: "ok",
			user: token,
			username: user.username,
			admin: user.admin,
		});
	} else return res.json({ status: "error", user: false, username: null });
});

// for adding a new user (ps: comment out when not req)
// const user = new User({
//   username: 'user',
//   password: 'user',
//   admin: false,
// }).save();

module.exports = router;
