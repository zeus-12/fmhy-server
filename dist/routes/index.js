"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthHandler_1 = __importDefault(require("../middlewares/AuthHandler"));
const GuidesRoute_1 = __importDefault(require("./GuidesRoute"));
const LinksRoute_1 = __importDefault(require("./LinksRoute"));
const SearchRoute_1 = __importDefault(require("./SearchRoute"));
const LinkQueueRoute_1 = __importDefault(require("./LinkQueueRoute"));
const Wiki_1 = __importDefault(require("./Wiki"));
const router = express_1.default.Router();
router.use(AuthHandler_1.default);
router.use("/search", SearchRoute_1.default);
router.use("/guides", GuidesRoute_1.default);
router.use("/links", LinksRoute_1.default);
router.use("/link-queue", LinkQueueRoute_1.default);
router.use("/wiki", Wiki_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map