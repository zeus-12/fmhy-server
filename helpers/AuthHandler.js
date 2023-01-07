const jwt = require("jsonwebtoken");
function authHandler(req, res, next) {
	const ignoreRoutes = [
		"/guides/all",
		"/submit-links/all",
		"/login",
		"/search"
	];
	let route = req.path;
	if (ignoreRoutes.indexOf(route) >= 0 || route.startsWith("/wiki/" || route.startsWith("/links/"))) {
		return next();
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
}
module.exports = { authHandler };
