const jwt = require("jsonwebtoken");
function authHandler(req, res, next) {
	const ignoreRoutes = [
		"/guides/all",
		"/submit-links/all",
		"/login",
		"/links/tools",
		"/links/miscellaneous",
		"/links/reading",
		"/links/android_ios",
		"/links/downloading",
		"/links/torrenting",
		"/links/linux_macos",
		"/links/streaming",
		"/links/adblock_privacy",

		"/wiki/adblock-vpn-privacy",
		"/wiki/video",
		"/wiki/audio",
		"/wiki/games",
		"/wiki/reading",
		"/wiki/download",
		"/wiki/torrent",
		"/wiki/edu",
		"/wiki/tools-misc",
		"/wiki/misc",
		"/wiki/android",
		"/wiki/linux",
		"/wiki/storage",
		"/wiki/non-eng",
		"/wiki/base64",
	];
	let route = req.path;
	if (ignoreRoutes.indexOf(route) >= 0) {
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
