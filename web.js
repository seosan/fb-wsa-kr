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

	//욕설
	var yokdb =
	[
		'?', 'ㅋ', '젠장'
	];
	var yok = new Array();

	for (index in yokdb) {
		yok[index] = 0;
	}

	var yokpos;
	function search(string, pos, index) {
		if((yokpos = string.indexOf(yokdb[index], pos)) != -1) {
			yok[index]++;
			search(string, yokpos + index.length, index);
		}
	}

	function findyok(string) {
		for (index in yokdb) {
			search(string, 0, index);
		}
	}




	//socket.emit('news', { hello: 'world' });
	socket.on('sendevent', function (data) {
 	   console.log('serversidegoooooooooood');
 	   findyok(data.sending);
 	   
	});

	socket.on('reqres', function () {
		socket.emit('yokanal', {anal : yok});
	});


  	socket.on('disconnect', function () {
    	console.log('user disconnected');
  	});




});