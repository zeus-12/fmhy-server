import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default function authHandler(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const ignoreRoutes = [
		"/guides/all",
		"/submit-links/all",
		"/login",
		"/search",
	];
	let route = req.path;
	if (
		ignoreRoutes.indexOf(route) >= 0 ||
		route.startsWith("/wiki") ||
		route.startsWith("/links")
	) {
		return next();
	} else {
		// @ts-ignore
		const token: string = req.headers["x-access-token"] ?? "";

		if (!token) {
			res.json({ error: "Not authenticated" });
			return;
		} else {
			try {
				// @ts-ignore

				const decoded = jwt.verify(token, process.env.SECRET_KEY);
				// @ts-ignore
				req.decoded = decoded;
				return next();
			} catch {
				res.json({ error: "Invalid token!" });
				return;
			}
		}
	}
}
