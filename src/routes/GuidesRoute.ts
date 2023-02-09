import {
	addNewGuide,
	deleteGuideById,
	getAllGuides,
	// getGuideById,
	getGuidesByUser,
	updateGuideById,
} from "../controller/GuidesController";
import express from "express";

var router = express.Router();

router.get("/", (_, res) => {
	return getAllGuides(res);
});

router.get("/user", (_, res) => {
	return getGuidesByUser(res);
});

router.post("/", (req, res) => {
	return addNewGuide(res, req.body);
});

router.delete("/:ID", async (req, res) => {
	return deleteGuideById(res, req.params.ID);
});

router.put("/:ID", (req, res) => {
	return updateGuideById(res, req.body, req.params.ID);
});

// ##### route not required rn => remember to whitelist it in authhandler #####

// router.get("/:ID", (req, res) => {
// 	const { ID } = req.params;
// 	const ObjectId = mongoose.Types.ObjectId;
// 	if (!ObjectId.isValid(ID)) {
// 		res.status(400).json({ error: "Invalid ID" });
// 		return;
// 	}

// 	return getGuideById(res, ID);
// });

export default router;
