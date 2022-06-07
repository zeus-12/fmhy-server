const mongoose = require("mongoose");
const express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const Link = require("../Link.js");
const SubmitLink = require("../SubmitLink.js");

var middlewares = require("../helpers/Middlewares");
// import * as Util from "../helpers/Util";

router.post("/", (req, res) => {
	console.log("here");
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
				return res
					.json({ error: "link already exists" })
					.sendStatus(401);
			} else {
				const submit_link = new SubmitLink({
					title: req.body.title,
					link: req.body.link,
					description: req.body.description,
					channel: req.body.channel,
					category: req.body.category,
					username: req.decoded.username,
					admin: req.decoded.admin,
				});
				submit_link
					.save()
					.then((result) => {
						console.log(result);
						res.status(200).json({ error: "Link added to queue." });
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
		res.json({ data: data }).status(200)
	);
});
router.get("/:ID", (req, res) => {
	var ObjectId = mongoose.Types.ObjectId;
	if (!ObjectId.isValid(req.params.ID)) {
		res.status(400).json({ error: "Invalid ID" });
		return;
	} else {
		SubmitLink.findOne({ _id: req.params.ID }).then((data) => {
			res.json({ status: "ok", data: data }).status(200);
			return;
		});
	}
});

module.exports = router;
