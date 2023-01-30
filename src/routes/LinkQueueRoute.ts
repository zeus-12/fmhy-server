import express from "express";
import Link from "../models/Link";
import mongoose from "mongoose";

import LinkQueue from "../models/LinkQueue";
var router = express.Router();

router.post("/", (req, res) => {
	Link.findOne({ link: req.body.link })
		// @ts-ignore
		.then((result: any) => {
			if (result) {
				return res
					.status(409)
					.json({ message: "Link already exists!" });
			} else {
				LinkQueue.findOne({ link: req.body.link })
					// @ts-ignore
					.then((result: any) => {
						if (result) {
							return res.status(409).json({
								message: "link already exists in Link queue!",
							});
						} else {
							const submit_link = new LinkQueue({
								title: req.body.title,
								link: req.body.link,
								description: req.body.description,
								channel: req.body.channel,
								category: req.body.category,
								username: res.locals.decoded.username,
								admin: res.locals.decoded.admin,
							});
							submit_link
								.save()
								.then((result: any) => {
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

router.get("/", (_, res) => {
	const submitted_links = LinkQueue.find().then((data) =>
		res.json({ data: data }).status(200)
	);
});

router.get("/:ID", (req, res) => {
	var ObjectId = mongoose.Types.ObjectId;
	if (!ObjectId.isValid(req.params.ID)) {
		res.status(400).json({ error: "Invalid ID" });
		return;
	} else {
		LinkQueue.findOne({ _id: req.params.ID }).then((data) => {
			res.json({ status: "ok", data: data }).status(200);
			return;
		});
	}
});

router.delete("/:ID", async (req, res) => {
	var ObjectId = mongoose.Types.ObjectId;
	if (!ObjectId.isValid(req.params.ID))
		res.status(400).json({ error: "Invalid ID" });
	else {
		if (res.locals.decoded.admin) {
			try {
				LinkQueue.findOneAndDelete({ _id: req.params.ID }).then(
					(data) => {
						res.json({ status: "ok", data });
					}
				);
			} catch {
				res.json({ error: "Error" }).end();
				return;
			}
		}
	}
});

router.put("/:ID", async (req, res) => {
	var ObjectId = mongoose.Types.ObjectId;
	if (!ObjectId.isValid(req.params.ID))
		res.status(400).json({ error: "Invalid ID" });
	else {
		if (res.locals.decoded.admin) {
			const updateData = req.body;

			try {
				LinkQueue.findOneAndUpdate(
					{ _id: req.params.ID },
					updateData
				).then((data) => {
					res.json({ status: "ok", data });
				});
			} catch {
				res.json({ error: "Error" }).end();
				return;
			}
		}
	}
});

export default router;
