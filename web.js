// web.js

var logfmt = require("logfmt");
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
		cho2.sort(function(a,b){return b-a});
		for(index in cho2) {
		    chodb2[index]= chodb[ cho[index] ];
		}
		turn();
	/*	for (index in chodb2) {
			search2(string, 0, index);
		}  */
	}

	socket.on('toserver', function (data) {
 	    findcho(data.sending);
	});

	function turn() {
		socket.emit('toclient', {anal : cho2, anal2 : chodb2}); //, anal2 : cho2});
	}


  	socket.on('disconnect', function () {
    	console.log('user disconnected');
  	});




});