const express = require("express");
var router = express.Router();
const Search = require("../models/Search.js");


router.get("/", async (req, res) => {

    const query = req.query.q;
    const page = req.query.page

    const ITEMS_PER_PAGE = 30

    try {

        const results = await Search.find({ title: { $regex: query, $options: "i" } })
            .skip(page > 0 ? (page - 1) * ITEMS_PER_PAGE : 0)
            .limit(ITEMS_PER_PAGE)

            const count = await Search.countDocuments({ title: { $regex: query, $options: "i" } });

        return res.json({
            status: "ok",
            data: results,
            count: count
        });
    } catch (err) {
        console.log(err)
        return res.json({
            status: "error",
        })
    }




});


module.exports = router;
