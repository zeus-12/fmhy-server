const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const submitLinkSchema = new Schema({
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

module.exports = mongoose.model("SubmitLink", submitLinkSchema);
