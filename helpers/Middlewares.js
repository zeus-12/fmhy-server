const jwt = require("jsonwebtoken");

function authHandler(req, res, next) {
	let ignoreRoutes = ["/guides/all", "/submit-links/all", "/login"];
	//TODO: to be fixed when edit and update is aded to links
	let ignore = ["links"];
	let route = req.path;
	if (ignoreRoutes.indexOf(route) >= 0) {
		return next();
		// } else if (ignore.indexOf(route.split("/")[1]) >= 0) {
		// return next();
	} else {
		const token = req.headers["x-access-token"];

		if (!token) {
			res.json({ error: "Not authenticated" });
			return;
		} else {
			try {
				const decoded = jwt.verify(token, process.env.SECRET_KEY);
				req.decoded = decoded;
				return next();
			} catch {
				res.json({ error: "Invalid token!" });
				return;
			}
		}
	}
	return next();
}
module.exports = { authHandler };
