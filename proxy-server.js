http = require('http');
httpProxy = require('http-proxy');
var express = require('express');
var sioc = require('socket.io-client');
var os = require('os');

var interfaces = os.networkInterfaces();

var proxy = httpProxy.createProxyServer({});

var canary_fail = false;

var i = 0;


var socket = sioc('http://' + interfaces.eth0[0].address + ':4006');

socket.on("heartbeat", function(client) 
{
	canary_fail = client.status;
	if((canary_fail == true) && (i == 0)){
		i++;
		console.log("Canary Server Failed.");
	}
});



var server = http.createServer(function(req, res) {

		var port = 3000;
		var percent = Math.floor((Math.random() * 10) + 1);
		console.log("Number: " + percent);
		if((percent > 7) && (!canary_fail)){
			port = 3001;
			console.log("Forwarding request to [CANARY - localhost:" + port+ "].");
		}
		else{
			port = 3000;
			console.log("Forwarding request to [STABLE - localhost:" + port+ "].");
		}
		proxy.web(req, res, { target: "http://localhost:" + port});
});
 
console.log("listening on port 5050")
server.listen(5050);

