const express = require("express");
var router = express.Router();

router.use(require("../helpers/Middlewares").authHandler);
router.use("/guides", require("./GuidesRoute"));
router.use("/login", require("./UserRoute"));
router.use("/links", require("./LinksRoute"));
router.use("/submit-links", require("./SubmitLinkRoute"));
router.use("/link-queue", require("./LinkQueueRoute"));

module.exports = router;
