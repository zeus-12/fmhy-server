import express from "express";
import jwt from "jsonwebtoken";
import { userSchema } from "../lib/zodSchemas";
import { fromZodError } from "zod-validation-error";
import User from "../models/User";
var router = express.Router();

router.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;

		userSchema.parse({ username, password });

		const user = await User.findOne({
			username,
			password,
		});

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
		} else
			return res.json({ status: "error", user: false, username: null });
	} catch (err) {
		return res.status(500).json({ error: fromZodError(err).message });
	}
});

router.post("/register", async (req, res) => {
	try {
		const { username, password } = req.body;

		userSchema.parse({ username, password });

		const user = new User({
			username,
			password,
			admin: false,
		});
		await user.save();

		return res.json({ success: true });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

// ---  ADD A NEW USER ---

// const user = new User({
//   username: 'user',
//   password: 'user',
//   admin: false,
// }).save();

export default router;
