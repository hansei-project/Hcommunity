"use strict";
const express = require("express");
const logger = require("morgan");
const hidePoweredBy = require("hide-powered-by");
const bodyParser = require("body-parser");
const createWriteStream = require("fs").createWriteStream;
const join = require("path").join;
const Server = require("http").Server;
const SocketIO = require("socket.io");
const config = require("./config");
const route_loader = require("./routes/route_loader");
const model_loader = require("./model/model_loader");

let app = express();
let server = Server(app);


app.set("views", join(__dirname + "/views/"));
app.set("view engine", "jade");
app.locals.pretty = true;

let accessLogStream = createWriteStream("./access.log", {flags: "a"});
app.use(logger('{"remote_addr": ":remote-addr", "remote_user": ":remote-user", "date": ":date[iso]", "method": ":method", "url": ":url", "http_version": ":http-version", "status": ":status", "result_length": ":res[content-length]", "referrer": ":referrer", "user_agent": ":user-agent", "response_time": ":response-time"},', {stream: accessLogStream}));

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(require("stylus").middleware({src: join(__dirname + "/public")}));
app.use(express.static(join(__dirname + "/public")));
app.disable("x-powered-by");

route_loader(app);
model_loader(app);

process.on('uncaughtException', (err) => {
	console.log('uncaughtException 발생 : ' + err);
});

server.listen(config["server_port"], () => {
	console.log(`SERVER PORT ${config['server_port']} LISTEN...!`);
});

module.exports = app;
