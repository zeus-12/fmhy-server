import { searchUsingQuery } from "../controller/SearchController";
import express from "express";

const router = express.Router();

router.get("/", async (req, res, next) => {
	return await searchUsingQuery(res, req.query).catch(next);
});
export default router;
