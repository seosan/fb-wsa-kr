// web.js

var logfmt = require("logfmt");
var fs = require('fs');
var FB = require("fb");

var express = require("express");
var app = express();

var http = require('http');
var server = http.createServer(app);
var ios = require('socket.io');

//욕설
	

// ---------------------------------------

ios = ios.listen(server);
app.use(logfmt.requestLogger());
app.get('/', function(req, res) {
  res.sendfile('/usr/index.html', {root:__dirname});
});
app.get('/style', function(req, res) {
  res.sendfile('/usr/style.css', {root:__dirname});
});
app.get('/timeago', function(req, res) {
  res.sendfile('/usr/jquery.timeago.js', {root:__dirname});
});
var port = Number(process.env.PORT || 5000);
server.listen(port, function() {
	console.log(port);
	console.log("Listening on " + port);
});

// ---------------------------------------



ios.sockets.on('connection', function(socket) {

	//----통신 시작----

	var cho = new Array();
	for (index in chodb) {
		cho[index] = 0;
	}
	var chodb =
	[
		'ㅋ', 'ㅎ', 'ㅇ', 'ㄴ', 'ㄷ', 'ㄳ', 'ㅅㄱ', 'ㅈㅅ', 'ㅅㅂ', 'ㅄ', 'ㅈㄹ', '盧', '?', '!'	
	];

	var chopos;
	function search1(string, pos, index) {
		if((chopos = string.indexOf(chodb[index], pos)) != -1) {
			cho[index]++;
			search1(string, chopos + index.length, index, true);
		}
	}
	
	function findcho(string) {
		for (index in chodb) {
			search1(string, 0, index);
		}
		return {anal:cho, anal2:chodb};
	}
//post = response.data[element]
	socket.on('toserver', function (string) {
 	    socket.emit('toclient', findcho(string) ); 
	});

		


  	socket.on('disconnect', function () {
    	console.log('user disconnected');
  	});




});