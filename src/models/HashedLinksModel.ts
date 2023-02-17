// for base64 encoded links

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const hashedLinkSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	hash: {
		type: String,
		required: true,
	},
});

export default mongoose.model("HashedLinks", hashedLinkSchema);
