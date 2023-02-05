import express from "express";
import jwt from "jsonwebtoken";
import { string } from "zod";
import User from "../models/User";
var router = express.Router();

router.post("/", async (req, res) => {
	const user = await User.findOne({
		username: req.body.username,
		password: req.body.password,
	});

	// todo validate req.body using zod

	if (user) {
		const token = jwt.sign(
			{ username: user.username, admin: user.admin },
			process.env.SECRET_KEY as string
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
