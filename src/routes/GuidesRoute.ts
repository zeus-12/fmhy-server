import {
	addNewGuide,
	deleteGuideById,
	getAllGuides,
	getGuideById,
	getGuidesByUser,
	updateGuideById,
} from "../controller/GuidesController";
import express from "express";

var router = express.Router();

router.get("/", async (_, res, next) => {
	return await getAllGuides(res).catch(next);
});

router.get("/user", async (_, res, next) => {
	return await getGuidesByUser(res).catch(next);
});

router.post("/", async (req, res, next) => {
	return await addNewGuide(res, req.body).catch(next);
});

router.delete("/:ID", async (req, res, next) => {
	return await deleteGuideById(res, req.params.ID).catch(next);
});

router.put("/:ID", async (req, res, next) => {
	return await updateGuideById(res, req.body, req.params.ID).catch(next);
});

router.get("/:ID", async (req, res, next) => {
	return await getGuideById(res, req.params).catch(next);
});

export default router;
