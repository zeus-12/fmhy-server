import express from "express";
import AuthHandler from "../middlewares/AuthHandler";
import GuidesRoute from "./GuidesRoute";
// import UserRoute from "./UserRoute";
import LinksRoute from "./LinksRoute";
import SearchRoute from "./SearchRoute";
import LinkQueueRoute from "./LinkQueueRoute";
import Wiki from "./Wiki";
const router = express.Router();

router.use(AuthHandler);
router.use("/search", SearchRoute);
router.use("/guides", GuidesRoute);
// router.use("/login", UserRoute);
router.use("/links", LinksRoute);
router.use("/link-queue", LinkQueueRoute);
router.use("/wiki", Wiki);

export default router;
