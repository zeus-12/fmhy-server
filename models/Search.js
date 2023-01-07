const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const searchSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	link: {
		type: Array,
		required: true,
	},
	starred: {
		type: Boolean,
		default: false,
	},

});

module.exports = mongoose.model("Search", searchSchema);
