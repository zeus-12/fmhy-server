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
const mongoose_1 = __importDefault(require("mongoose"));
const Guide_1 = __importDefault(require("../models/Guide"));
var router = express_1.default.Router();
router.get("/", (_, res) => {
    Guide_1.default.find().then((data) => res.send(data));
});
router.get("/user", (req, res) => {
    Guide_1.default.find({ owner: res.locals.decoded.username }).then((data) => res.json({ status: "ok", data: data }));
});
router.post("/", (req, res) => {
    Guide_1.default.findOne({ link: req.body.link }).then((data) => {
        if (data) {
            res.status(400);
            res.end();
            return;
        }
        else {
            const guide = new Guide_1.default({
                title: req.body.title.trim(),
                link: req.body.link.replaceAll(" ", ""),
                nsfw: req.body.nsfw ? true : false,
                owner: res.locals.decoded.username,
                credits: req.body.credits,
                tags: req.body.tags,
            });
            guide
                .save()
                .catch((err) => {
                console.log(err);
            });
            res.end();
        }
    });
});
router.delete("/:ID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var ObjectId = mongoose_1.default.Types.ObjectId;
    if (!ObjectId.isValid(req.params.ID))
        res.status(400).json({ error: "Invalid ID" });
    else {
        if (res.locals.decoded.admin) {
            Guide_1.default.findOneAndDelete({ _id: req.params.ID }).then((data) => {
                res.json({ status: "ok", deletedGuide: data });
            });
        }
        else {
            Guide_1.default.findOneAndDelete({
                _id: req.params.ID,
                owner: res.locals.decoded.username,
            });
            res.json({ status: "ok" });
        }
    }
}));
router.get("/:ID", (req, res) => {
    var ObjectId = mongoose_1.default.Types.ObjectId;
    if (!ObjectId.isValid(req.params.ID))
        res.status(400).json({ error: "Invalid ID" });
    else {
        Guide_1.default.find({ _id: req.params.ID }).then((data) => {
            if (data) {
                data = data[0];
                return res.json({
                    status: "ok",
                    data: {
                        title: data.title,
                        link: data.link,
                        nsfw: data.nsfw,
                        tags: data.tags,
                        credits: data.credits,
                    },
                });
            }
        });
    }
});
router.put("/:ID", (req, res) => {
    var ObjectId = mongoose_1.default.Types.ObjectId;
    if (!ObjectId.isValid(req.params.ID))
        res.status(400).json({ error: "Invalid ID" });
    else {
        Guide_1.default.findOne({
            link: req.body.link,
            _id: { $ne: req.params.ID },
        }).then((data) => {
            if (data) {
                res.status(400).end();
                return;
            }
            else {
                const guide = Guide_1.default.find({ _id: req.params.ID });
                if (!guide) {
                    res.status(400).json({ error: "Invalid ID" });
                }
                guide
                    .updateOne({
                    title: req.body.title.trim(),
                    link: req.body.link.replaceAll(" ", ""),
                    nsfw: req.body.nsfw ? true : false,
                    tags: req.body.tags,
                    credits: req.body.credits.trim(),
                })
                    .then(() => {
                    res.json({ status: "ok" });
                });
            }
        });
    }
});
exports.default = router;
//# sourceMappingURL=GuidesRoute.js.map