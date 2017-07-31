"use strict";
const xmlparse = require("xml-parser");

let index = async(req, res) => {
	let model = req["app"]["get"]("model")["requestModel"];
	let weather = xmlparse(await model.get("http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=1144056500"));
	res.render("index", {weather: weather["root"]["children"][0]["children"][6]["children"][5]["children"][1]["children"][0]["children"]});
}

module.exports.index = index;