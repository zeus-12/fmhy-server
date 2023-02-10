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

router.get("/", async (_, res) => {
	return await getAllGuides(res);
});

router.get("/user", async (_, res) => {
	return await getGuidesByUser(res);
});

router.post("/", async (req, res) => {
	return await addNewGuide(res, req.body);
});

router.delete("/:ID", async (req, res) => {
	return await deleteGuideById(res, req.params.ID);
});

router.put("/:ID", async (req, res) => {
	return await updateGuideById(res, req.body, req.params.ID);
});

router.get("/:ID", async (req, res) => {
	return await getGuideById(res, req.params);
});

export default router;
