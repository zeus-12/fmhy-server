"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const Link_1 = __importDefault(require("../models/Link"));
const SubmitLink_1 = __importDefault(require("../models/SubmitLink"));
router.post("/", (req, res) => {
    Link_1.default.findOne({ link: req.body.link })
        .then((result) => {
        if (result) {
            return res
                .status(409)
                .json({ message: "Link already exists!" });
        }
        else {
            SubmitLink_1.default.findOne({ link: req.body.link })
                .then((result) => {
                if (result) {
                    return res.status(409).json({
                        message: "link already exists in Link queue!",
                    });
                }
                else {
                    const submit_link = new SubmitLink_1.default({
                        title: req.body.title,
                        link: req.body.link,
                        description: req.body.description,
                        channel: req.body.channel,
                        category: req.body.category,
                        username: req.decoded.username,
                        admin: req.decoded.admin,
                    });
                    submit_link
                        .save()
                        .then((result) => {
                        res.status(200).json({
                            message: "Link added to queue.",
                        });
                        res.end();
                        return;
                    })
                        .catch((err) => {
                        console.log(err);
                    });
                }
            })
                .catch((err) => console.log(err));
        }
    })
        .catch((err) => console.log(err));
});
router.get("/all", (_, res) => {
    const submitted_links = SubmitLink_1.default.find().then((data) => res.json({ data: data }).status(200));
});
router.get("/:ID", (req, res) => {
    var ObjectId = mongoose_1.default.Types.ObjectId;
    if (!ObjectId.isValid(req.params.ID)) {
        res.status(400).json({ error: "Invalid ID" });
        return;
    }
    else {
        SubmitLink_1.default.findOne({ _id: req.params.ID }).then((data) => {
            res.json({ status: "ok", data: data }).status(200);
            return;
        });
    }
});
exports.default = router;
//# sourceMappingURL=SubmitLinkRoute.js.map