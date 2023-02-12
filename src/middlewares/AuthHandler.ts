import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default function authHandler(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const ignoreGetRoutes = ["/guides", "/link-queue"];
	const ignoreAllRoutes = [
		"/login",
		"/search",
		"/user/login",
		"/user/register",
	];
	const ignoreStartsWithRoutes = ["/wiki", "/links"];

	let route = req.path;
	if (
		(req.method === "GET" && ignoreGetRoutes.indexOf(route) >= 0) ||
		ignoreAllRoutes.indexOf(route) >= 0 ||
		ignoreStartsWithRoutes.some((r) => route.startsWith(r))
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
				return next();
			} catch {
				res.json({ error: "Invalid token!" });
				return;
			}
		}
	}
}
