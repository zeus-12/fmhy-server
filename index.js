const express = require("express");
const mongoose = require("mongoose");
const Guide = require("./Guide.js");
const User = require("./User.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3001;
const dbURI = process.env.DB_URI;

const log = require("./logger");

mongoose
	.connect(dbURI)
	.then((result) => {
		console.log("connected to db");
		app.listen(PORT);
	})
	.then(console.log(`Server listening on port ${PORT}`))
	.catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

// for adding a new user (ps: comment out when not req)
// const user = new User({
//   username: 'user',
//   password: 'user',
//   admin: false,
// }).save();

//for adding new guide
app.post("/api/guides/new", (req, res) => {
	console.log(req.body);

	Guide.findOne({ link: req.body.link }).then((data) => {
		if (data) {
			res.status(400);
			res.end();
		} else {
			const guide = new Guide({
				title: req.body.title.trim(),
				link: req.body.link.replaceAll(" ", ""),
				nsfw: req.body.nsfw ? true : false,
				owner: req.body.username,
			});

			guide
				.save()
				.then((result) => {
					log.add(result.title, result.link, result.nsfw);
					console.log(result);
					res.status(200);
				})
				.catch((err) => {
					console.log(err);
				});

			res.end();
		}
	});
});

//for fetching all the guides
app.get("/api/guides/all", (req, res) => {
	Guide.find().then((data) => res.send(data));
});

app.get("/api/guides/user", (req, res) => {
	if (!req.headers["x-access-token"]) res.json({ error: "Not authenticated" });
	const token = req.headers["x-access-token"];
	const decoded = jwt.verify(token, process.env.SECRET_KEY);
	Guide.find({ owner: decoded.username }).then((data) =>
		res.json({ status: "ok", data: data }),
	);
});

//for signing in
app.post("/api/login", async (req, res) => {
	console.log(req.body);
	const user = await User.findOne({
		username: req.body.user_name,
		password: req.body.password,
	});
	if (user) {
		console.log("login successful");
		const token = jwt.sign(
			{ username: user.username, admin: user.admin },
			process.env.SECRET_KEY,
		);
		return res.json({
			status: "ok",
			user: token,
			username: user.username,
			admin: user.admin,
		});
	} else return res.json({ status: "error", user: false, username: null });
});

//for deleting an existing guide
app.delete("/api/guides/delete/:ID", async (req, res) => {
	var ObjectId = mongoose.Types.ObjectId;
	if (!ObjectId.isValid(req.params.ID))
		res.status(400).json({ error: "Invalid ID" });
	else {
		if (!req.headers["x-access-token"])
			res.send({ error: "Not authenticated" });
		const token = req.headers["x-access-token"];
		const decoded = jwt.verify(token, process.env.SECRET_KEY);

		if (decoded.admin) {
			Guide.findOneAndDelete({ _id: req.params.ID }).then(
				(data) => res.json({ status: "ok", deletedGuide: data }),
				//					.finally(log.remove(data.title, data.link, data.nsfw)),
			);
		} else {
			Guide.findOneAndDelete({
				_id: req.params.ID,
				owner: decoded.username,
			}).then((data) => res.json({ status: "ok", deletedGuide: data }));
			//				.finally(log.remove(data.title, data.link, data.nsfw));
		}
	}
});

//for fetching a particular guide: used to populate data for editing the guide(once added)
app.get("/api/guides/:ID", (req, res) => {
	var ObjectId = mongoose.Types.ObjectId;
	if (!ObjectId.isValid(req.params.ID))
		res.status(400).json({ error: "Invalid ID" });
	else {
		Guide.find({ _id: req.params.ID }).then((data) => {
			console.log(data[0]);
			if (data) {
				data = data[0];
				console.log(data);
				return res.json({
					status: "ok",
					data: {
						title: data.title,
						link: data.link,
						nsfw: data.nsfw,
					},
				});
			}
		});
	}
});

//to update a guide
app.put("/api/guides/:ID", (req, res) => {
	var ObjectId = mongoose.Types.ObjectId;
	if (!ObjectId.isValid(req.params.ID))
		res.status(400).json({ error: "Invalid ID" });
	else {
		Guide.findOne({ link: req.body.link, _id: { $ne: req.params.ID } }).then(
			(data) => {
				if (data) {
					console.log("here");
					console.log(data._id, req.params.ID);
					res.status(400);
					res.end();
				} else {
					const guide = Guide.find({ _id: req.params.ID });
					if (!guide) {
						res.status(400).json({ error: "Invalid ID" });
					}
					console.log(req.body);
					guide
						.updateOne({
							title: req.body.title.trim(),
							link: req.body.link.replaceAll(" ", ""),
							nsfw: req.body.nsfw ? true : false,
						})
						.then(() => {
							res.json({ status: "ok" });
						})
						.finally(log.update(req.body.title, req.body.link, req.body.nsfw));
				}
			},
		);
	}
});
