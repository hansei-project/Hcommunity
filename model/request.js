"use_strict";
const get = require("request").get;
const post = require("request").post;

module.exports = new class {
	constructor() {
		this.author = "antiweb <antiweb@noe.systems>";
		this.user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36";
	}
	get(siteURL) {
		return new Promise((resolve) => {
			get({
				url: siteURL,
				headers: {
					"User-Agent": this.user_agent
				}
			}, (err, res, body) => resolve(body));
		});
	}
}