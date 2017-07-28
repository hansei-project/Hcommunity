"use strict";
let Router = require("express").Router;

let router = Router();

router.get("/", (req, res) => {
	res.render("index");
});

module.exports = router;