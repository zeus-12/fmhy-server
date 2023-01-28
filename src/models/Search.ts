import mongoose from "mongoose";
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
	isNsfw: {
		type: Boolean,
		default: false,
	},
});

export default mongoose.model("Search", searchSchema);
