const express = require("express");
var router = express.Router();
const Link = require("../models/Link.js");
var fs = require("fs");

router.get("/:CATEGORY/:CHANNEL", (req, res) => {
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
router.get("/:CATEGORY", (req, res) => {
	const CATEGORY = req.params.CATEGORY;

	Link.find({ category: CATEGORY }).then((data) => {
		if (data) {
			return res.json({
				status: "ok",
				data: data,
			});
		}
	});
});

//posting link
router.post("/:CATEGORY/:CHANNEL", (req, res) => {
	//check if category and channel is valid
	const CATEGORY = req.params.CATEGORY;
	const CHANNEL = req.params.CHANNEL;
	if (!(CATEGORY === req.body.category && CHANNEL === req.body.channel)) {
		res.status(400).json({ error: "category or channel doesnt match" });
		return;
	}

	const link = new Link({
		title: req.body.title.trim(),
		link: req.body.link,
		description: req.body.description,
		category: req.body.category,
		channel: req.body.channel,
	});

	link.save()
		.then((result) => {
			console.log(result);
		})
		.catch((err) => {
			console.log(err);
		});

	res.end();
	return;
});

//  for adding links to db, add the files(101) into link-cleaning/json
// fs.readdir('../link-cleaning/json', (err, files) => {
// 	files.forEach((fileName) => {
// 		if (fileName == '.DS_Store') return;

// 		let rawdata = fs.readFileSync('../link-cleaning/json/' + fileName);

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

module.exports = router;
