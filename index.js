const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const { allowList } = require("./helpers/allowList");

const app = express();

const PORT = process.env.PORT || 3001;
const dbURI = process.env.DB_URI;

mongoose
	.connect(dbURI)
	.then((result) => {
		console.log("connected to db");
		app.listen(PORT);
	})
	.then(console.log(`Server listening on port ${PORT}`))
	.catch((err) => console.log(err));

app.use(
	cors({
		origin: allowList,
	})
);

app.use(express.json());

app.use("/api", require("./routes/index.js"));
