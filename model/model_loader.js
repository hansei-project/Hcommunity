"use strict";
const config = require("../config");

module.exports = (app) => {
	let model = {};
	for(let i in config["model_info"]) {
		if(!model[config["model_info"][i]["modelName"]])
			model[config["model_info"][i]["modelName"]] = require(config["model_info"][i]["file"]);
	}
	app.set("model", model);
	console.log("model Loaded...");
};