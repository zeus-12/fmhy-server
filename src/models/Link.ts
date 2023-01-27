import mongoose from "mongoose";
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

export default mongoose.model("Link", linkSchema);
