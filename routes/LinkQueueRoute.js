const express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const SubmitLink = require("../SubmitLink.js");

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
			SubmitLink.findOneAndDelete({ _id: req.params.ID }).then((data) => {
				res.json({ status: "ok", deletedSubmittedLink: data });
			});
		}
	}
});

module.exports = router;
