import mongoose from "mongoose";
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

export default mongoose.model("SubmitLink", submitLinkSchema);
