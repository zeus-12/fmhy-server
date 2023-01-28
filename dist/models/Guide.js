"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const guideSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
        unique: true,
    },
    nsfw: {
        type: Boolean,
    },
    owner: {
        type: String,
    },
    credits: {
        type: String,
    },
    tags: {
        type: Array,
    },
});
exports.default = mongoose_1.default.model("Guide", guideSchema);
//# sourceMappingURL=Guide.js.map