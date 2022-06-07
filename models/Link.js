const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

module.exports = mongoose.model("Link", linkSchema);
