const router = require("express").Router();
const formData = require("form-data");
const model = require("../../models/discordUser");
const proxyUrl = "http://localhost:3001/authorize/callback";

router.get("/callback", (req, res) => {
	const accessCode = req.query.code;
	if (!accessCode) {
		res.send("No access code returned :(");
	} else {
		const data = new formData();
		data.append("client_id", process.env.DISCORD_CLIENT_ID);
		data.append("client_secret", process.env.DISCORD_CLIENT_SECRET);
		data.append("grant_type", "authorization_code");
		data.append("redirect_uri", proxyUrl);
		data.append("scopes", ["identify", "guilds"]);
		data.append("code", accessCode);

		// fetching data from Discord's API
		fetch("https://discordapp.com/api/oauth2/token", {
			method: "POST",
			body: data,
		})
			.then((res) => res.json())
			.then((response) => {
				fetch("https://discordapp.com/api/users/@me", {
					method: "GET",
					headers: {
						authorization: `${response.token_type} ${response.access_token}`,
					},
				});
			})
			.then((res2) => res2.json())
			.then((userResponse) => {
				username = `${userResponse.username}#${userResponse.discriminator}`;
				req.session.metadata = userResponse;
				console.log(username); // TODO: add to webhook
			});
		fetch("https://discordapp.com/api/users/@me/guilds", {
			method: "GET",
			headers: {
				authorization: `${response.token_type} ${response.access_token}`,
			},
		});
		// TODO: do stuff for guilds later
		// also elon pls sort mongoose models kthx
	}
});

// GET logout
router.get("/logout", (req, res) => {
	if (req.session.userdata) {
		req.session.destroy((err) => {
			if (err) return console.error(err);
			console.log("Session destroyed.");
		});
		res.redirect(proxyUrl);
	} else {
		res.redirect(proxyUrl);
	}
});

// GET userinfo
router.get("/getUserData", (req, res) => {
	if (!req.session.userdata) {
		res.json({
			login: false,
		});
	} else {
		res.json({
			login: true,
			username: username,
		});
	}
});

module.exports = router;
