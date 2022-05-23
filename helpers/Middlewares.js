const jwt = require("jsonwebtoken");

module.exports = {
	authHandler: function (req, res, next) {
		if (!req.headers["x-access-token"]) {
			res.json({ error: "Not authenticated" });
			return;
		}
		const token = req.headers["x-access-token"];
		if (!token) {
			res.json({ error: "Not authenticated" });
			return;
		}
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		if (!decoded) {
			res.json({});
			return;
		}
		next();
	},
};
