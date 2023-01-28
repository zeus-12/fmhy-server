"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const linkSchema = new Schema({
    title: {
        type: String,
    },
    link: {
        type: Array,
        required: true,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    channel: {
        type: String,
        required: true,
    },
});
exports.default = mongoose_1.default.model("Link", linkSchema);
//# sourceMappingURL=Link.js.map