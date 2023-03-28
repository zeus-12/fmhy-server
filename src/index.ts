import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import ALLOW_LIST from "./config/AllowList";
import dotenv from "dotenv";
import Router from "./routes/index";
// import scrapeScript from "./scraper/v1/index";
// import cron from "node-cron";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;
const dbURI = process.env.DB_URI!;

mongoose
	.connect(dbURI)
	.then((_) => {
		console.log("connected to db⚡️");
		app.listen(PORT);
	})
	.then(() => console.log(`Server listening on port ${PORT}✨`))
	.catch((err) => console.log(err));

app.use(
	cors({
		origin: ALLOW_LIST,
	})
);

app.use(express.json());
app.use("/api", Router);

// cron.schedule("30 19 * * *", async () => {
// 	await scrapeScript();
// });
