import mongoose from "mongoose";
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
	},
	credits: {
		type: String,
	},
	tags: {
		type: Array,
	},
});

export default mongoose.model("Guide", guideSchema);
