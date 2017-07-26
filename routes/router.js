"use strict";
let Router = require("express").Router;

let router = Router();

router.get("/", (req, res) => {
	res.send("<p>TEST!</p>");
});

module.exports = router;