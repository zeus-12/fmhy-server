const mongoose = require("mongoose");
const express = require("express");
var router = express.Router();
const SubmitLink = require("../models/SubmitLink.js");
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
			} catch (_a) {
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
			} catch (_a) {
				res.json({ error: "Error" }).end();
				return;
			}
		}
	}
});
module.exports = router;
//# sourceMappingURL=LinkQueueRoute.js.map
