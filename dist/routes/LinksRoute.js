"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Link_1 = __importDefault(require("../models/Link"));
const router = express_1.default.Router();
router.get("/:CATEGORY/:CHANNEL", (req, res) => {
    const CATEGORY = req.params.CATEGORY;
    const CHANNEL = req.params.CHANNEL;
    Link_1.default.find({ category: CATEGORY, channel: CHANNEL }).then((data) => {
        if (data) {
            return res.json({
                status: "ok",
                data: data,
            });
        }
    });
});
router.get("/:CATEGORY", (req, res) => {
    const CATEGORY = req.params.CATEGORY;
    Link_1.default.find({ category: CATEGORY }).then((data) => {
        if (data) {
            return res.json({
                status: "ok",
                data: data,
            });
        }
    });
});
router.post("/:CATEGORY/:CHANNEL", (req, res) => {
    const CATEGORY = req.params.CATEGORY;
    const CHANNEL = req.params.CHANNEL;
    if (!(CATEGORY === req.body.category && CHANNEL === req.body.channel)) {
        res.status(400).json({ error: "category or channel doesnt match" });
        return;
    }
    const link = new Link_1.default({
        title: req.body.title.trim(),
        link: req.body.link,
        description: req.body.description,
        category: req.body.category,
        channel: req.body.channel,
    });
    link.save()
        .then((result) => {
        console.log(result);
    })
        .catch((err) => {
        console.log(err);
    });
    res.end();
    return;
});
exports.default = router;
//# sourceMappingURL=LinksRoute.js.map