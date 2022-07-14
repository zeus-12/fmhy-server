const mongoose = require("mongoose");
const express = require("express");
var router = express.Router();
const Link = require("../models/Link.js");
const SubmitLink = require("../models/SubmitLink.js");

router.post("/", (req, res) => {
	Link.findOne({ link: req.body.link })
		.then((result) => {
			if (result) {
				return res
					.status(409)
					.json({ message: "Link already exists!" });
			} else {
				SubmitLink.findOne({ link: req.body.link })
					.then((result) => {
						if (result) {
							return res.status(409).json({
								message: "link already exists in Link queue!",
							});
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
									res.status(200).json({
										message: "Link added to queue.",
									});
									res.end();
									return;
								})
								.catch((err) => {
									console.log(err);
								});
						}
					})
					.catch((err) => console.log(err));
			}
		})
		.catch((err) => console.log(err));
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
