import { searchUsingQuery } from "../controller/SearchController";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
	await searchUsingQuery(res, req.query);
});
export default router;
