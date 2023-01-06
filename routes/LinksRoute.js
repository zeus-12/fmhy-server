const express = require("express");
var router = express.Router();
const Link = require("../models/Link.js");
var fs = require("fs");

router.get("/:CATEGORY/:CHANNEL", (req, res) => {
	const CATEGORY = req.params.CATEGORY;
	const CHANNEL = req.params.CHANNEL;

	Link.find({ category: CATEGORY, channel: CHANNEL }).then((data) => {
		if (data) {
			return res.json({
				status: "ok",
				data: data,
			});
		}
	});
});
router.get("/:CATEGORY", (req, res) => {
	const CATEGORY = req.params.CATEGORY;

	Link.find({ category: CATEGORY }).then((data) => {
		if (data) {
			// console.log(data)
			return res.json({
				status: "ok",
				data: data,
			});
		}
	});
});

//posting link
router.post("/:CATEGORY/:CHANNEL", (req, res) => {
	//check if category and channel is valid
	const CATEGORY = req.params.CATEGORY;
	const CHANNEL = req.params.CHANNEL;
	if (!(CATEGORY === req.body.category && CHANNEL === req.body.channel)) {
		res.status(400).json({ error: "category or channel doesnt match" });
		return;
	}

	const link = new Link({
		title: req.body.title.trim(),
		link: req.body.link,
		description: req.body.description,
		category: req.body.category,
		channel: req.body.channel,
	});

	link.save()
		.then((result) => {
			console.log(result);
		})
		.catch((err) => {
			console.log(err);
		});

	res.end();
	return;
});


module.exports = router;
