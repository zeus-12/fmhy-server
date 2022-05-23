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
	if (!req.headers["x-access-token"]) res.json({ error: "Not authenticated" });
	const token = req.headers["x-access-token"];
	const decoded = jwt.verify(token, process.env.SECRET_KEY);
	Guide.find({ owner: decoded.username }).then((data) =>
		res.json({ status: "ok", data: data }),
	);
});
router.post("/new", (req, res) => {
	console.log(req.body);
	if (!req.headers["x-access-token"]) res.json({ error: "Not authenticated" });
	const token = req.headers["x-access-token"];
	const decoded = jwt.verify(token, process.env.SECRET_KEY);

	Guide.findOne({ link: req.body.link }).then((data) => {
		if (data) {
			res.status(400);
			res.end();
		} else {
			const guide = new Guide({
				title: req.body.title.trim(),
				link: req.body.link.replaceAll(" ", ""),
				nsfw: req.body.nsfw ? true : false,
				owner: req.body.username,
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
						result.credits,
					);
					console.log(result);
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
		if (!req.headers["x-access-token"])
			res.send({ error: "Not authenticated" });
		const token = req.headers["x-access-token"];
		const decoded = jwt.verify(token, process.env.SECRET_KEY);

		if (decoded.admin) {
			Guide.findOneAndDelete({ _id: req.params.ID }).then(
				(data) => {
					log.remove(data.title, data.link, data.nsfw, data.tags, data.credits);
					res.json({ status: "ok", deletedGuide: data });
				},
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
				owner: decoded.username,
			}).then((data) => {
				log.remove(data.title, data.link, data.nsfw, data.tags, data.credits);
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
			console.log(data[0]);
			if (data) {
				data = data[0];
				console.log(data);
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
		Guide.findOne({ link: req.body.link, _id: { $ne: req.params.ID } }).then(
			(data) => {
				if (data) {
					console.log("here");
					console.log(data._id, req.params.ID);
					res.status(400);
					res.end();
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
								req.body.credits,
							),
						);
				}
			},
		);
	}
});

module.exports = router;
