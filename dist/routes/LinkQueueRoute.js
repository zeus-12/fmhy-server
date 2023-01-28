"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Link_1 = __importDefault(require("../models/Link"));
const mongoose_1 = __importDefault(require("mongoose"));
const LinkQueue_1 = __importDefault(require("../models/LinkQueue"));
var router = express_1.default.Router();
router.post("/", (req, res) => {
    Link_1.default.findOne({ link: req.body.link })
        .then((result) => {
        if (result) {
            return res
                .status(409)
                .json({ message: "Link already exists!" });
        }
        else {
            LinkQueue_1.default.findOne({ link: req.body.link })
                .then((result) => {
                if (result) {
                    return res.status(409).json({
                        message: "link already exists in Link queue!",
                    });
                }
                else {
                    const submit_link = new LinkQueue_1.default({
                        title: req.body.title,
                        link: req.body.link,
                        description: req.body.description,
                        channel: req.body.channel,
                        category: req.body.category,
                        username: res.locals.decoded.username,
                        admin: res.locals.decoded.admin,
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
router.get("/", (_, res) => {
    const submitted_links = LinkQueue_1.default.find().then((data) => res.json({ data: data }).status(200));
});
router.get("/:ID", (req, res) => {
    var ObjectId = mongoose_1.default.Types.ObjectId;
    if (!ObjectId.isValid(req.params.ID)) {
        res.status(400).json({ error: "Invalid ID" });
        return;
    }
    else {
        LinkQueue_1.default.findOne({ _id: req.params.ID }).then((data) => {
            res.json({ status: "ok", data: data }).status(200);
            return;
        });
    }
});
router.delete("/:ID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var ObjectId = mongoose_1.default.Types.ObjectId;
    if (!ObjectId.isValid(req.params.ID))
        res.status(400).json({ error: "Invalid ID" });
    else {
        if (res.locals.decoded.admin) {
            try {
                LinkQueue_1.default.findOneAndDelete({ _id: req.params.ID }).then((data) => {
                    res.json({ status: "ok", data });
                });
            }
            catch (_a) {
                res.json({ error: "Error" }).end();
                return;
            }
        }
    }
}));
router.put("/:ID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var ObjectId = mongoose_1.default.Types.ObjectId;
    if (!ObjectId.isValid(req.params.ID))
        res.status(400).json({ error: "Invalid ID" });
    else {
        if (res.locals.decoded.admin) {
            const updateData = req.body;
            try {
                LinkQueue_1.default.findOneAndUpdate({ _id: req.params.ID }, updateData).then((data) => {
                    res.json({ status: "ok", data });
                });
            }
            catch (_b) {
                res.json({ error: "Error" }).end();
                return;
            }
        }
    }
}));
exports.default = router;
//# sourceMappingURL=LinkQueueRoute.js.map