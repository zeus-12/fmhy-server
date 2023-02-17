import express from "express";
import AuthHandler from "../middlewares/AuthHandler";
import ErrorFactory from "../middlewares/ErrorFactory";
import GuidesRoute from "./GuidesRoute";
// import UserRoute from "./UserRoute";
import LinksRoute from "./LinksRoute";
import SearchRoute from "./SearchRoute";
import LinkQueueRoute from "./LinkQueueRoute";
import HashedLinksRoute from "./HashedLinksRoute";
import Wiki from "./Wiki";
const router = express.Router();

router.use(AuthHandler);
// router.use("/user", UserRoute);
router.use("/search", SearchRoute);
router.use("/guides", GuidesRoute);
router.use("/links", LinksRoute);
router.use("/hashed-links", HashedLinksRoute);
router.use("/link-queue", LinkQueueRoute);
router.use("/wiki", Wiki);
router.use(ErrorFactory);

export default router;
