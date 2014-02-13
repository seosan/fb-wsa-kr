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
	var cho2 = cho;
	var chodb2 = chodb;

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
		cho2.sort(function(a,b){return b-a});
		for(index in cho2) {
		    chodb2[index]= chodb[ cho[index] ];
		}
		fs.writeFile("/tmp/test", {anal:cho2, anal2:chodb2});
		return {anal:cho2, anal2:chodb2};
	}

	socket.on('toserver', function (data) {
 	    socket.emit('toclient', findcho(data.sending) ); 
	});

		


  	socket.on('disconnect', function () {
    	console.log('user disconnected');
  	});




});