const express = require("express");
const mongoose = require("mongoose");
const Guide = require("./Guide.js");
const User = require("./User.js");
const Link = require("./Link.js");
const SubmitLink = require("./SubmitLink.js");
const jwt = require("jsonwebtoken");
var fs = require("fs");

require("dotenv").config();
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3001;
const dbURI = process.env.DB_URI;

const log = require("./logger");
const { GridFSBucketWriteStream } = require("mongodb");
const { db } = require("./Guide.js");

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
	if (!req.headers["x-access-token"]) res.json({ error: "Not authenticated" });
	const token = req.headers["x-access-token"];
	const decoded = jwt.verify(token, process.env.SECRET_KEY);

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
				credits: req.body.credits,
				tags: req.body.tags,
			});

			guide
				.save()
				.then((result) => {
					log.add(
						result.title,
						result.link,
						result.nsfw,
						result.tags,
						result.credits,
					);
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
				(data) => {
					log.remove(data.title, data.link, data.nsfw, data.tags, data.credits);
					res.json({ status: "ok", deletedGuide: data });
				},
				// .finally((data) =>
				// 	log.remove(
				// 		data.title,
				// 		data.link,
				// 		data.nsfw,
				// 		data.tags,
				// 		data.credits,
				// 	),
				// ),
			);
		} else {
			Guide.findOneAndDelete({
				_id: req.params.ID,
				owner: decoded.username,
			}).then((data) => {
				log.remove(data.title, data.link, data.nsfw, data.tags, data.credits);
				res.json({ status: "ok", deletedGuide: data });
			});
			// .finally((data) =>
			// );
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
						tags: data.tags,
						credits: data.credits,
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
							tags: req.body.tags,
							credits: req.body.credits.trim(),
						})
						.then(() => {
							res.json({ status: "ok" });
						})
						.finally(
							log.update(
								req.body.title,
								req.body.link,
								req.body.nsfw,
								req.body.tags,
								req.body.credits,
							),
						);
				}
			},
		);
	}
});

//  for adding links to db, add the files(101) into link-cleaning/json
// fs.readdir('./link-cleaning/json', (err, files) => {
// 	files.forEach((fileName) => {
// 		if (fileName == '.DS_Store') return;

// 		let rawdata = fs.readFileSync('./link-cleaning/json/' + fileName);

// 		const result = JSON.parse(rawdata);

// 		// let resources = [];
// 		result.messages.map((item) => {

// 			let resource = item.content;
// 			let link = []
// 			let description = resource.split('**')[1];
// 			let linkItems = resource
// 				.split('*')
// 				.slice(-1)[0]
// 				.replace('\n', '')
// 				.replaceAll('None', '')
// 				.trim()
// 				.replaceAll('+', ',');

// 			//if more than 1 link
// 			const linkArray = linkItems.split('\n')
// 			linkArray.forEach((link_item) => { link.push(link_item) })

// 			if (link.slice(0, 1) == '/n') link = link.slice(1);
// 			let title = resource.split('*').slice(-2, -1)[0]?.replaceAll('&amp', '&');
// 			if (!link || !description) { console.log(resource); return }
// 			category = result.channel.category.slice(2).replaceAll(' ','').replaceAll('/','_').toLowerCase();
// 			channel = result.channel.name.replaceAll(' ','').replaceAll('/','_').toLowerCase();
// 			// resources.push({ title, link, description, category });

// 			const link_entry = new Link({
// 				title,link,description,category,channel
// 			});

// 			link_entry.save().catch((err) => {
// 				console.log(err);
// 			});

// 			// fs.appendFileSync('./links.txt', 'title:' + title + '\n');
// 			// fs.appendFileSync('./links.txt', 'link:' + link + '\n');
// 			// fs.appendFileSync('./links.txt', 'descrption:' + description + '\n');
// 			// fs.appendFileSync('./links.txt', 'category:' + category + '\n');
// 			// fs.appendFileSync('./links.txt', 'channel:' + channel + '\n');
// 			// fs.appendFileSync('./links.txt','\n')
// 		});
// 		// console.log(resources);
// 	})
// })

app.get("/api/links/:CATEGORY/:CHANNEL", (req, res) => {
	const CATEGORY = req.params.CATEGORY;
	const CHANNEL = req.params.CHANNEL;

	Link.find({ category: CATEGORY, channel: CHANNEL }).then((data) => {
		if (data) {
			return res.json({
				status: "ok",
				data: data,
			});
		}
	});
});
app.get("/api/links/:CATEGORY", (req, res) => {
	const CATEGORY = req.params.CATEGORY;

	Link.find({ category: CATEGORY }).then((data) => {
		if (data) {
			// console.log(data)
			return res.json({
				status: "ok",
				data: data,
			});
		}
	});
});

app.post("/api/submit-links", (req, res) => {
	if (!req.headers["x-access-token"]) res.json({ error: "Not authenticated" });
	const token = req.headers["x-access-token"];
	const decoded = jwt.verify(token, process.env.SECRET_KEY);
	//check if link already exist
	Link.findOne({ link: req.body.link })
		.then((result) => {
			if (result) {
				return res.sendStatus(401);
			}
		})
		.catch((err) => console.log(err));

	SubmitLink.findOne({ link: req.body.link })
		.then((result) => {
			if (result) {
				return res.sendStatus(401);
			} else {
				const submit_link = new SubmitLink({
					title: req.body.title,
					link: req.body.link,
					description: req.body.description,
					channel: req.body.channel,
					category: req.body.category,
					username: decoded.username,
					admin: decoded.admin,
				});
				submit_link
					.save()
					.then((result) => {
						console.log(result);
						res.status(200).json({ error: "Already exists in the queue." });
						res.end();
					})
					.catch((err) => {
						console.log(err);
					});
			}
		})
		.catch((err) => console.log(err));
	//if it doesnt exist then post
});
app.get("/api/submitted-links", (req, res) => {
	const submitted_links = SubmitLink.find().then((data) =>
		res.json({ data: data }).status(200),
	);
});

//to get list of channels for a given category
// app.get('/api/channels/:CATEGORY', (req, res) => {
// 	const CATEGORY = req.params.CATEGORY;
// 	let channels = []
// 	Link.find({ category: CATEGORY }).then((data) => {
// 		data.map((item) => {
// 			if (channels.includes(item.channel)) return;
// 			else channels.push(item.channel)
// 		})
// 		console.log(channels)
// 		res.json({channels})

// 	})

// })

const category_channels = [
	{
		category: "tools",
		channels: [
			"audio-tools",
			"career-tools",
			"developer-tools",
			"discord-tools",
			"educational-tools",
			"file-tools",
			"facebook-tools",
			"gaming-tools",
			"general-tools",
			"image-tools",
			"internet-tools",
			"reddit-tools",
			"search-tools",
			"system-tools",
			"telegram-tools",
			"text-tools",
			"twitch-tools",
			"twitter-tools",
			"url-tools",
			"video-tools",
			"youtube-tools",
		],
	},
	{
		category: "miscellaneous",
		channels: [
			"browser-games",
			"cooking",
			"extensions",
			"fonts",
			"fun-sites",
			"health",
			"indexes",
			"maps",
			"media-databases",
			"news",
			"non-english",
			"piracy-discussion",
			"request-media",
			"subtitles",
		],
	},
	{
		category: "reading",
		channels: [
			"audiobooks",
			"comics",
			"ebook-readers",
			"educational",
			"general",
			"light-novels",
			"manga",
			"magazines",
			"religion-esoteric",
			"newspapers",
		],
	},
	{
		category: "android_ios",
		channels: [
			"android-adblocking",
			"android-audio",
			"android-emulators",
			"android-general",
			"android-privacy",
			"android-reading",
			"android-torrenting",
			"android-video",
			"ios-adblocking",
			"ios-audio",
			"ios-general",
			"ios-jailbreaking",
			"ios-privacy",
			"ios-torrenting",
			"ios-reading",
			"ios-video",
		],
	},
	{
		category: "downloading",
		channels: [
			"anime",
			"arcade-retro",
			"educational",
			"emulators-roms",
			"games",
			"general",
			"movies-tv",
			"music",
			"software",
			"usenet",
		],
	},
	{
		category: "torrenting",
		channels: [
			"anime",
			"educational",
			"games",
			"general",
			"movies-tv",
			"music",
			"torrent-clients",
		],
	},
	{
		category: "linux_macos",
		channels: [
			"linux-adblock-privacy",
			"linux-gaming",
			"linux-general",
			"linux-software",
			"mac-adblock-privacy",
			"mac-gaming",
			"mac-general",
			"mac-software",
		],
	},
	{
		category: "streaming",
		channels: [
			"ambient-relaxation",
			"anime",
			"educational",
			"movies-tv",
			"live-tv",
			"podcasts-radio",
			"music",
			"sports",
		],
	},
	{
		category: "adblock_privacy",
		channels: ["adblocking", "antivirus", "dns", "privacy", "proxies", "vpn"],
	},
];
