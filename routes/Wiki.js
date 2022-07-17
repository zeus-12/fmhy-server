const express = require("express");
const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));
var router = express.Router();

router.get("/:ID", async (req, res) => {
	const { ID } = req.params;
	const url = `https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/${ID}.json`;
	const response = await fetch(url);
	const data = await response.json();

	res.status(200).json(data?.data?.content_md);
});

module.exports = router;
