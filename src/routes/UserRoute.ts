import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
var router = express.Router();

//for signing in
router.post("/", async (req, res) => {
	const user = await User.findOne({
		username: req.body.user_name,
		password: req.body.password,
	});
	if (user) {
		const token = jwt.sign(
			{ username: user.username, admin: user.admin },
			// @ts-ignore

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

// for adding a new user (ps: comment out when not req)
// const user = new User({
//   username: 'user',
//   password: 'user',
//   admin: false,
// }).save();

export default router;