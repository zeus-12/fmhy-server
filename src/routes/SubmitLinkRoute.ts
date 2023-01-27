import mongoose from "mongoose";
import express from "express";

var router = express.Router();
import Link from "../models/Link";
import SubmitLink from "../models/SubmitLink";

router.post("/", (req, res) => {
	Link.findOne({ link: req.body.link })
		// @ts-ignore

		.then((result: any) => {
			if (result) {
				return res
					.status(409)
					.json({ message: "Link already exists!" });
			} else {
				SubmitLink.findOne({ link: req.body.link })
					// @ts-ignore

					.then((result: any) => {
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

router.get("/all", (_, res) => {
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

export default router;
