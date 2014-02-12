// web.js

var logfmt = require("logfmt");
var FB = require("fb");

var express = require("express");
var app = express();

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')

//욕설
	var chodb =
	[
		'ㅋ', 'ㄴ', 'ㅇ', 'ㄳ', 'ㅅㄱ', 'ㄷ', '?', 'ㅎ', '盧', 'ㅈㄹ', '^^'
	];
	var cho = new Array();
	for (index in chodb) {
		cho[index] = 0;
	}


// ---------------------------------------

io = io.listen(server);
app.use(logfmt.requestLogger());
app.get('/', function(req, res) {
  res.sendfile('/usr/index.html', {root:__dirname});
});
app.get('/style', function(req, res) {
  res.sendfile('/usr/style.css', {root:__dirname});
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
	var chodb2 =
	[
		'ㄷㅊ', 'ㅁㄴㅇㄹ', 'ㅈㄴ'
	]
	var cho2 = new Array();
	for (index in chodb2) {
		cho2[index] = 0;
	} */

	var chopos;
	//var chopos2;
	//var chopos3;
	function search1(string, pos, index) {
		if((chopos = string.indexOf(chodb[index], pos)) != -1) {
			cho[index]++;
			search1(string, chopos + index.length, index, true);
		}	
	}
	
/*
	function search2(string, pos, index) {
		if((chopos2 = string.indexOf(chodb2[index], pos)) != -1) {
			cho2[index]++;
			removeRed(cho2[index], 0);
			search2(string, chopos2 + index.length, index, false);
		}
	}

	function removeRed(string, pos) {
		for (index in chodb) {
			if((chopos3 = string.indexOf(chodb[index], pos)) != -1) {
				cho[index]--;
				removeRed(string, chopos3 + index.length);
			}
		}
	}
*/

	function findcho(string) {
		for (index in chodb) {
			search1(string, 0, index);
		}
	/*	for (index in chodb2) {
			search2(string, 0, index);
		}  */
	}

	socket.on('sendevent', function (data) {
 	   findcho(data.sending);
 	   
	});

	socket.on('reqres', function () {
		socket.emit('choanal', {anal : cho}); //, anal2 : cho2});
	});


  	socket.on('disconnect', function () {
    	console.log('user disconnected');
  	});




});