import { getHashedLinks } from "../controller/HashedLinkController";
import express from "express";

var router = express.Router();

router.get("/", async (req, res, next) => {
	return await getHashedLinks(res, req.query).catch(next);
});
export default router;
