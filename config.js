module.exports = {
	server_port: 3333,
	route_info: [
        {file: "./router", path: "/", method: "index", type: "get"}
	],
    model_info: [
        {file: "./request", modelName: "requestModel"}
    ]
}