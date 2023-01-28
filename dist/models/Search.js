"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const searchSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: Array,
        required: true,
    },
    starred: {
        type: Boolean,
        default: false,
    },
    isNsfw: {
        type: Boolean,
        default: false,
    },
});
exports.default = mongoose_1.default.model("Search", searchSchema);
//# sourceMappingURL=Search.js.map