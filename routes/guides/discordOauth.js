const router = require("express").Router()
const fetch = require("node-fetch")
const formData = require("form-data")

const model = require("../../models/discordUser")

router.get("/callback", (req, res) => {
  const accessCode = req.query.code
  if (!accessCode) {
    res.send("No access code returned :(")
  } else {
    const data = new formData();
    data.append("client_id", process.env.DISCORD_CLIENT_ID)
    data.append("client_secret", process.env.DISCORD_CLIENT_SECRET)
    data.append("grant_type", "authorization_code")
    data.append("redirect_uri", "http://localhost:3001/authorize/callback")
    data.append("scopes", ["identify", "guilds"])
    data.append("code", accessCode)

    // fetching data from Discord's API
    fetch("https://discordapp.com/api/oauth2/token", {
      method: "POST",
      body: data
    })
    .then(res => res.json())
    .then(response => {
      fetch("https://discordapp.com/api/users/@me", {
        method: "GET",
        headers: {
          authorization: `${response.token_type} ${response.access_token}` 
        }
      })
    })
    // TODO: add the rest stuff
    // also elon pls clean up code and mongoose models kthx
    // bai bai - tasky <3
  }
})
