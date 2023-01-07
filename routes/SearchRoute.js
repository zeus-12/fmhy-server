const express = require("express");
var router = express.Router();
const Search = require("../models/Search.js");


router.get("/", async (req, res) => {

    const query = req.query.q;
    const page = req.query.page

    const ITEMS_PER_PAGE = 30

    await Search.find({ title: { $regex: query, $options: "i" } })
        .skip(page > 0 ? (page - 1) * ITEMS_PER_PAGE : 0)
        .limit(ITEMS_PER_PAGE)
        .then((data) => {
            if (data) {
                return res.json({
                    status: "ok",
                    data: data,
                });
            } else {
                return res.json({
                    status: "error",
                })
            }
        })

});


module.exports = router;
