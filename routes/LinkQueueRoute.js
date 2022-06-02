const mongoose = require("mongoose");
const express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const SubmitLink = require("../SubmitLink.js");

router.delete("/delete/:ID", async (req, res) => {
	var ObjectId = mongoose.Types.ObjectId;
	if (!ObjectId.isValid(req.params.ID))
		res.status(400).json({ error: "Invalid ID" });
	else {
		if (req.decoded.admin) {
			SubmitLink.findOneAndDelete({ _id: req.params.ID }).then((data) => {
				res.json({ status: "ok", deletedSubmittedLink: data });
			});
		}
	}
});

module.exports = router;
