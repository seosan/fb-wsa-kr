// web.js
var express = require("express");
var logfmt = require("logfmt");
var FB = require("fb");
var app = express();
var io = require('socket.io');

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.sendfile('/index.html', {root:__dirname});
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log(port);
	console.log("Listening on " + port);
});

/*
var io = io.listen(app);


io.socket.on('connection', function(socket) {
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
	 	   console.log(data);
	});
  	socket.on('disconnect', function () {
    	console.log('user disconnected');
  	});
}); */