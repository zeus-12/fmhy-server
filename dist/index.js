"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const AllowList_1 = __importDefault(require("./config/AllowList"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./routes/index"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
const dbURI = process.env.DB_URI;
mongoose_1.default
    .connect(dbURI)
    .then((result) => {
    console.log("connected to db");
    app.listen(PORT);
})
    .then(console.log(`Server listening on port ${PORT}`))
    .catch((err) => console.log(err));
app.use((0, cors_1.default)({
    origin: AllowList_1.default,
}));
app.use(express_1.default.json());
app.use("/api", index_1.default);
//# sourceMappingURL=index.js.map