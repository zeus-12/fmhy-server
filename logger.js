const { Webhook, MessageBuilder } = require("discord-webhook-node");
const hook = new Webhook(process.env.WEBHOOK);

hook.setUsername("Guide Logs");
hook.setAvatar("https://fmhy.cf/assets/logo.png");

function add(title, link, nsfw, tags, credits) {
	const description = `${`\`\`\`diff\n+ Title: ${title} | Link: ${link} | NSFW: ${nsfw} | Tags: ${tags} | Credits: ${credits} \`\`\``}`;
	// what a beautiful mess
	const message = new MessageBuilder()
		.setTitle("Added")
		.setColor("#07c4e3")
		.setDescription(description)
		.setTimestamp();
	hook.send(message); // Send the message
}

function remove(title, link, nsfw, tags, credits) {
	const description = `${`\`\`\`diff\n+ Title: ${title} | Link: ${link} | NSFW: ${nsfw} | Tags: ${tags} | Credits: ${credits} \`\`\``}`;
	// what a beautiful mess

	const message = new MessageBuilder()
		.setTitle("Removed")
		.setColor("#ff4a4a")
		.setDescription(description)
		.setTimestamp();
	hook.send(message);
}

function update(title, link, nsfw, tags, credits) {
	const description = `${`\`\`\`diff\n+ Title: ${title} | Link: ${link} | NSFW: ${nsfw} | Tags: ${tags} | Credits: ${credits} \`\`\``}`;

	const message = new MessageBuilder()
		.setTitle("Updated")
		.setColor("#aec5e8")
		.setDescription(description)
		.setTimestamp();
	hook.send(message);
}

module.exports = { add, remove, update };
