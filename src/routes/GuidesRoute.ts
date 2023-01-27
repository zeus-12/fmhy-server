import express from "express";
import mongoose from "mongoose";
import Guide from "../models/Guide";

var router = express.Router();

router.get("/all", (_, res) => {
	Guide.find().then((data: any) => res.send(data));
});

router.get("/user", (req, res) => {
	Guide.find({ owner: req.decoded.username }).then((data: any) =>
		res.json({ status: "ok", data: data })
	);
});
router.post("/new", (req, res) => {
	Guide.findOne({ link: req.body.link }).then((data: any) => {
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

				.catch((err: any) => {
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
			Guide.findOneAndDelete({ _id: req.params.ID }).then((data: any) => {
				res.json({ status: "ok", deletedGuide: data });
			});
		} else {
			Guide.findOneAndDelete({
				_id: req.params.ID,
				owner: req.decoded.username,
			});

			res.json({ status: "ok" });
		}
	}
});

// for fetching a particular guide: used to populate data for modifying the guide
router.get("/:ID", (req, res) => {
	var ObjectId = mongoose.Types.ObjectId;
	if (!ObjectId.isValid(req.params.ID))
		res.status(400).json({ error: "Invalid ID" });
	else {
		// @ts-ignore
		Guide.find({ _id: req.params.ID }).then((data: any) => {
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
		}).then((data: any) => {
			if (data) {
				res.status(400).end();
				return;
			} else {
				const guide = Guide.find({ _id: req.params.ID });
				if (!guide) {
					res.status(400).json({ error: "Invalid ID" });
				}

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
					});
			}
		});
	}
});

export default router;
