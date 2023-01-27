import express from "express";
import mongoose from "mongoose";

import SubmitLink from "../models/SubmitLink";
var router = express.Router();

router.delete("/delete/:ID", async (req, res) => {
	var ObjectId = mongoose.Types.ObjectId;
	if (!ObjectId.isValid(req.params.ID))
		res.status(400).json({ error: "Invalid ID" });
	else {
		if (req.decoded.admin) {
			try {
				SubmitLink.findOneAndDelete({ _id: req.params.ID }).then(
					(data) => {
						res.json({ status: "ok", deletedSubmittedLink: data });
					}
				);
			} catch {
				res.json({ error: "Error" }).end();
				return;
			}
		}
	}
});

router.put("/update/:ID", async (req, res) => {
	var ObjectId = mongoose.Types.ObjectId;
	if (!ObjectId.isValid(req.params.ID))
		res.status(400).json({ error: "Invalid ID" });
	else {
		if (req.decoded.admin) {
			const updateData = req.body;

			try {
				SubmitLink.findOneAndUpdate(
					{ _id: req.params.ID },
					updateData
				).then((data) => {
					res.json({ status: "ok", deletedSubmittedLink: data });
				});
			} catch {
				res.json({ error: "Error" }).end();
				return;
			}
		}
	}
});

export default router;
