"use strict";
const Router = require("express").Router;
const config = require("../config");

module.exports = (app) => {
	let router = Router();

	for(let i in config["route_info"]) {
		switch(config["route_info"][i]["type"]) {
			case "get":
				router.route(config["route_info"][i]["path"]).get(require(config["route_info"][i]["file"])[config["route_info"][i]["method"]]);
				break;
		}
	}
	app.use("/", router);
	console.log("router Loaded...");
};