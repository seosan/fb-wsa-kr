// web.js

var logfmt = require("logfmt");
var FB = require("fb");

var express = require("express");
var app = express();

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')

io = io.listen(server);


app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.sendfile('/usr/index.html', {root:__dirname});
});

var port = Number(process.env.PORT || 5000);
server.listen(port, function() {
	console.log(port);
	console.log("Listening on " + port);
});




io.sockets.on('connection', function(socket) {
	socket.on('sendevent', function (data) {
	 	   console.log(data);
	});
  	socket.on('disconnect', function () {
    	console.log('user disconnected');
  	});
});