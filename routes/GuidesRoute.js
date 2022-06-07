const express = require("express");
const mongoose = require("mongoose");
var router = express.Router();
const Guide = require("../Guide.js");
const log = require("../logger");
const jwt = require("jsonwebtoken");

// for fetching all the guides
router.get("/all", (req, res) => {
	Guide.find().then((data) => res.send(data));
});

router.get("/user", (req, res) => {
	Guide.find({ owner: req.decoded.username }).then((data) =>
		res.json({ status: "ok", data: data })
	);
});
router.post("/new", (req, res) => {
	Guide.findOne({ link: req.body.link }).then((data) => {
		if (data) {
			res.status(400);
			res.end();
			return;
		} else {
			const guide = new Guide({
				title: req.body.title.trim(),
				link: req.body.link.replaceAll(" ", ""),
				nsfw: req.body.nsfw ? true : false,
				owner: req.decoded.username,
				credits: req.body.credits,
				tags: req.body.tags,
			});

			guide
				.save()
				.then((result) => {
					log.add(
						result.title,
						result.link,
						result.nsfw,
						result.tags,
						result.credits
					);

					res.status(200);
				})
				.catch((err) => {
					console.log(err);
				});

			res.end();
		}
	});
});

//for deleting an existing guide
router.delete("/delete/:ID", async (req, res) => {
	var ObjectId = mongoose.Types.ObjectId;
	if (!ObjectId.isValid(req.params.ID))
		res.status(400).json({ error: "Invalid ID" });
	else {
		if (req.decoded.admin) {
			Guide.findOneAndDelete({ _id: req.params.ID }).then(
				(data) => {
					log.remove(
						data.title,
						data.link,
						data.nsfw,
						data.tags,
						data.credits
					);
					res.json({ status: "ok", deletedGuide: data });
				}
				// .finally((data) =>
				// 	log.remove(
				// 		data.title,
				// 		data.link,
				// 		data.nsfw,
				// 		data.tags,
				// 		data.credits,
				// 	),
				// ),
			);
		} else {
			Guide.findOneAndDelete({
				_id: req.params.ID,
				owner: req.decoded.username,
			}).then((data) => {
				log.remove(
					data.title,
					data.link,
					data.nsfw,
					data.tags,
					data.credits
				);
				res.json({ status: "ok", deletedGuide: data });
			});
			// .finally((data) =>
			// );
		}
	}
});

// for fetching a particular guide: used to populate data for modifying the guide
router.get("/:ID", (req, res) => {
	var ObjectId = mongoose.Types.ObjectId;
	if (!ObjectId.isValid(req.params.ID))
		res.status(400).json({ error: "Invalid ID" });
	else {
		Guide.find({ _id: req.params.ID }).then((data) => {
			if (data) {
				data = data[0];
				return res.json({
					status: "ok",
					data: {
						title: data.title,
						link: data.link,
						nsfw: data.nsfw,
						tags: data.tags,
						credits: data.credits,
					},
				});
			}
		});
	}
});

//to update a guide
router.put("/:ID", (req, res) => {
	var ObjectId = mongoose.Types.ObjectId;
	if (!ObjectId.isValid(req.params.ID))
		res.status(400).json({ error: "Invalid ID" });
	else {
		Guide.findOne({
			link: req.body.link,
			_id: { $ne: req.params.ID },
		}).then((data) => {
			if (data) {
				res.status(400).end();
				return;
			} else {
				const guide = Guide.find({ _id: req.params.ID });
				if (!guide) {
					res.status(400).json({ error: "Invalid ID" });
				}
				console.log(req.body);
				guide
					.updateOne({
						title: req.body.title.trim(),
						link: req.body.link.replaceAll(" ", ""),
						nsfw: req.body.nsfw ? true : false,
						tags: req.body.tags,
						credits: req.body.credits.trim(),
					})
					.then(() => {
						res.json({ status: "ok" });
					})
					.finally(
						log.update(
							req.body.title,
							req.body.link,
							req.body.nsfw,
							req.body.tags,
							req.body.credits
						)
					);
			}
		});
	}
});

module.exports = router;
