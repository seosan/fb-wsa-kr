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
	var yok =
	[
		'Fuck', 'Shit', '뻨', '쒵', '쓑', '쒯', '개새끼', '개시끼', '개세끼', '개색기', '개색끼', '개객끼', '개객기', '개같은', '개놈', '개년', '개자식', '씨발', '씨벌', '씨불', '씹할', '씨팔', '씨벨', '씨부랄', '씨부럴', '씨팔', '씨펄', 'ㅅㅂ', 'ㅆㅂ', '씹창', '씹년', '씹놈', '좆', '존나', 'ㅈㄴ', '미친놈', '미친년', '미친새끼', '엄창', '앰창', '니미', '병신', '븅신', '븅딱', '퓽신', '비융신', '피융신', 'ㅄ', 'ㅂㅅ', '지랄', '닥쳐', '盧?', '젠장', '빌어먹을', '빌어쳐먹을', '빌어처먹을', '제기랄'
	];

	for (kind in yok) {
		yok[kind] = 0;
	}

	var yokpos;
	function search(string, pos, kind) {
		if((yokpos = string.indexOf(kind, pos)) != -1) {
			yok[kind]++;
			console.log(kind); console.log(kind);console.log(kind);console.log(kind);console.log(kind);
			search(string, yokpos + kind.length, kind);
		}
	}

	function findyok(string) {
		for (kind in yok) {
			search(string, 0, kind);
		}
	}




	//socket.emit('news', { hello: 'world' });
	socket.on('sendevent', function (data) {
	 	   console.log('serversidegoooooooooood');
	 	   
	 	   findyok(data.sending);
	 	   socket.emit('yokanal', {value: yok});

	});


  	socket.on('disconnect', function () {
    	console.log('user disconnected');
  	});




});