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
app.get('/favicon', function(req, res) {
  res.sendfile('/usr/favicon.ico', {root:__dirname});
});
app.get('/temp/test', function(req, res) {
  res.sendfile('/temp/test.txt', {root:__dirname});
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
var db = new Array(23);


ios.sockets.on('connection', function(socket) {

	//----통신 시작----
	
	var chodb =
	[
		'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㅂ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅎ', 'ㄳ', 'ㅄ', 'ㅗ', 'ㅠ', '盧', '?', '!', ';', 'ㅡㅡ', '^^', '^~^', '^0^' // 'ㅅㄱ', 'ㅈㅅ', 'ㅅㅂ', 'ㅈㄹ', 'ㅇㅅㅇ'
	];
	var cho = new Array();
	for (index in chodb) {
		cho[index] = 0;
	}

	var chopos;
	function search1(string, pos, index) {
		if((chopos = string.indexOf(chodb[index], pos) ) != -1) {
			cho[index]++;
			search1(string, chopos+(chodb[index].length), index);
		}
	}
	socket.on('toserver', function (string) {
		for (index in chodb) {
			search1(string, 0, index);
		}
		db += cho;
		fs.writeFile("/temp/test", db);
	});

	socket.on('to2server', function () {
		socket.emit('toclient', {anal:cho, anal2:chodb} ); 
	});

		


  	socket.on('disconnect', function () {
    	console.log('user disconnected');
  	});




});