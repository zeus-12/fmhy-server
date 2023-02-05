import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default function authHandler(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const ignoreGetRoutes = ["/guides", "/link-queue"];
	const ignoreAllRoutes = ["/login", "/search"];

	let route = req.path;
	if (
		(req.method === "GET" && ignoreGetRoutes.indexOf(route) >= 0) ||
		ignoreAllRoutes.indexOf(route) >= 0 ||
		route.startsWith("/wiki") ||
		route.startsWith("/links")
	) {
		return next();
	} else {
		const token = req.headers["x-access-token"] as string;
		if (!token) {
			res.json({ error: "Not authenticated" });
			return;
		} else {
			try {
				const decoded = jwt.verify(
					token,
					process.env.SECRET_KEY as string
				);

				res.locals.user = decoded;
				console.log(decoded);
				return next();
			} catch {
				res.json({ error: "Invalid token!" });
				return;
			}
		}
	}
}
