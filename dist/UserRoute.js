const express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
router.post("/", async (req, res) => {
	const user = await User.findOne({
		username: req.body.user_name,
		password: req.body.password,
	});
	if (user) {
		const token = jwt.sign(
			{ username: user.username, admin: user.admin },
			process.env.SECRET_KEY
		);
		return res.json({
			status: "ok",
			user: token,
			username: user.username,
			admin: user.admin,
		});
	} else return res.json({ status: "error", user: false, username: null });
});
module.exports = router;
//# sourceMappingURL=UserRoute.js.map
