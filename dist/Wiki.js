var __createBinding =
	(this && this.__createBinding) ||
	(Object.create
		? function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (
					!desc ||
					("get" in desc
						? !m.__esModule
						: desc.writable || desc.configurable)
				) {
					desc = {
						enumerable: true,
						get: function () {
							return m[k];
						},
					};
				}
				Object.defineProperty(o, k2, desc);
		  }
		: function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				o[k2] = m[k];
		  });
var __setModuleDefault =
	(this && this.__setModuleDefault) ||
	(Object.create
		? function (o, v) {
				Object.defineProperty(o, "default", {
					enumerable: true,
					value: v,
				});
		  }
		: function (o, v) {
				o["default"] = v;
		  });
var __importStar =
	(this && this.__importStar) ||
	function (mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null)
			for (var k in mod)
				if (
					k !== "default" &&
					Object.prototype.hasOwnProperty.call(mod, k)
				)
					__createBinding(result, mod, k);
		__setModuleDefault(result, mod);
		return result;
	};
const express = require("express");
const fetch = (...args) =>
	Promise.resolve()
		.then(() => __importStar(require("node-fetch")))
		.then(({ default: fetch }) => fetch(...args));
var router = express.Router();
router.get("/:ID", async (req, res) => {
	var _a;
	const { ID } = req.params;
	const url = `https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/${ID}.json`;
	const response = await fetch(url);
	const data = await response.json();
	res.status(200).json(
		(_a = data === null || data === void 0 ? void 0 : data.data) === null ||
			_a === void 0
			? void 0
			: _a.content_md
	);
});
module.exports = router;
//# sourceMappingURL=Wiki.js.map
