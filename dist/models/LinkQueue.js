"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const linkQueueSchema = new Schema({
    title: {
        type: String,
    },
    link: {
        type: Array,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    channel: {
        type: String,
    },
    username: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
    },
});
exports.default = mongoose_1.default.model("LinkQueue", linkQueueSchema);
//# sourceMappingURL=LinkQueue.js.map