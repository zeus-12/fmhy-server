"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authHandler(req, res, next) {
    var _a;
    const ignoreRoutes = [
        "/guides/all",
        "/submit-links/all",
        "/login",
        "/search",
    ];
    let route = req.path;
    if (ignoreRoutes.indexOf(route) >= 0 ||
        route.startsWith("/wiki") ||
        route.startsWith("/links")) {
        return next();
    }
    else {
        const token = (_a = req.headers["x-access-token"]) !== null && _a !== void 0 ? _a : "";
        if (!token) {
            res.json({ error: "Not authenticated" });
            return;
        }
        else {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
                req.decoded = decoded;
                return next();
            }
            catch (_b) {
                res.json({ error: "Invalid token!" });
                return;
            }
        }
    }
}
exports.default = authHandler;
//# sourceMappingURL=AuthHandler.js.map