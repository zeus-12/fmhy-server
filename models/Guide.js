const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guideSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	link: {
		type: String,
		required: true,
		unique: true,
	},
	nsfw: {
		type: Boolean,
	},
	owner: {
		type: String,
		// default: '',
	},
	credits: {
		type: String,
	},
	tags: {
		type: Array,
	},
	//maybe add a credit field to give credits to the creator.
});

module.exports = mongoose.model("Guide", guideSchema);
