"use strict";
let express = require("express");
let logger = require("morgan");
let hidePoweredBy = require("hide-powered-by");
let bodyParser = require("body-parser");
let createWriteStream = require("fs").createWriteStream;
let join = require("path").join;
let Server = require("http").Server;
let SocketIO = require("socket.io");

let app = express();
let server = Server(app);

app.set("views", __dirname + "/views/");
app.set("view engine", "jade");
app.locals.pretty = true;

let accessLogStream = createWriteStream("./access.log", {flags: "a"});
app.use(logger('{"remote_addr": ":remote-addr", "remote_user": ":remote-user", "date": ":date[iso]", "method": ":method", "url": ":url", "http_version": ":http-version", "status": ":status", "result_length": ":res[content-length]", "referrer": ":referrer", "user_agent": ":user-agent", "response_time": ":response-time"},', {stream: accessLogStream}));

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(require("stylus").middleware({src: __dirname + "/public"}));
app.use(express.static(__dirname + "/public"));
app.disable("x-powered-by");

app.use(require(join(__dirname + "/routes/router")));

process.on('uncaughtException', (err) => {
	console.log('uncaughtException 발생 : ' + err);
});

server.listen(80, () => {
	console.log("SERVER PORT 80 LISTEN...!");
});

module.exports = app;