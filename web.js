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

// ---------------------------------------



io.sockets.on('connection', function(socket) {

	//----통신 시작----
/*
	//욕설
	var chodb =
	[
		'ㅋ', 'ㄴ', 'ㅇ', 'ㄳ', 'ㅅㄱ', 'ㄷ', '?', '盧', 'ㅈㄹ'
	];
	var chodb2 =
	[
		'ㄷㅊ', 'ㅁㄴㅇㄹ', 'ㅈㄴ'
	]
	var cho = new Array();
	var cho2 = new Array();
	
	for (index in chodb) {
		cho[index] = 0;
	}
	for (index in chodb2) {
		cho2[index] = 0;
	}

	var chopos;
	function search(string, pos, index, norcho) {
		if((chopos = string.indexOf(chodb[index], pos)) != -1) {
			if(norcho) {
				cho[index]++;
				search(string, chopos + index.length, index, true);
			} else {
				cho2[index]++;
				removeRed(cho2[index], 0);
				search(string, chopos + index.length, index, false);
			}
		}
	}

	function removeRed(string, pos) {
		for (index in chodb) {
			if((chopos = string.indexOf(chodb[index], pos)) != -1) {
				console.log(string+"에서 "+cho[index]+"를 제거");
				cho[index]--;
				removeRed(string, chopos + index.length);
			}
		}
	}


	function findcho(string) {
		for (index in chodb) {
			search(string, 0, index, true);
		}
		for (index in chodb2) {
			search(string, 0, index, false);
		}
	}
*/
	socket.on('sendevent', function (data) {
 	   console.log('serversidegoooooooooood');
 	   //findcho(data.sending);
 	   
	});

	socket.on('reqres', function () {
		socket.emit('choanal', {anal : "good"});//{anal : cho}); //, anal2 : cho2});
	});


  	socket.on('disconnect', function () {
    	console.log('user disconnected');
  	});




});