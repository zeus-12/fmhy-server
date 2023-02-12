import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export default function ErrorFactory(
	error: any,
	_: Request,
	res: Response,
	__: NextFunction
) {
	return res.status(500).json({
		status: "error",

		message:
			error instanceof ZodError
				? fromZodError(error).message
				: error.message,
	});
}
