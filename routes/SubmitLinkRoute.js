const express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const Link = require("../Link.js");
const SubmitLink = require("../SubmitLink.js");

var middlewares = require("../helpers/Middlewares");
// import * as Util from "../helpers/Util";

router.post("/", (req, res) => {
	if (!req.headers["x-access-token"]) {
		res.json({ error: "Not authenticated" });
		return;
	}
	const token = req.headers["x-access-token"];
	if (!token) {
		res.json({ error: "Not authenticated" });
		return;
	}
	const decoded = jwt.verify(token, process.env.SECRET_KEY);
	if (!decoded) {
		res.json({});
		return;
	}

	//check if link already exist
	Link.findOne({ link: req.body.link })
		.then((result) => {
			if (result) {
				return res.sendStatus(401);
			}
		})
		.catch((err) => console.log(err));

	SubmitLink.findOne({ link: req.body.link })
		.then((result) => {
			if (result) {
				return res.sendStatus(401);
			} else {
				const submit_link = new SubmitLink({
					title: req.body.title,
					link: req.body.link,
					description: req.body.description,
					channel: req.body.channel,
					category: req.body.category,
					username: decoded.username,
					admin: decoded.admin,
				});
				submit_link
					.save()
					.then((result) => {
						console.log(result);
						res.status(200).json({ error: "Already exists in the queue." });
						res.end();
						return;
					})
					.catch((err) => {
						console.log(err);
					});
			}
		})
		.catch((err) => console.log(err));
	//if it doesnt exist then post
});
router.get("/all", (req, res) => {
	const submitted_links = SubmitLink.find().then((data) =>
		res.json({ data: data }).status(200),
	);
});

module.exports = router;
