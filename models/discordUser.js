const db = require("mongoose");

const discordUserSchema = new db.Schema({
	username: String,
	userid: Number,
});

module.exports = mongoose.model("discordUser", discordUserSchema);
