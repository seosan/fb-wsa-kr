// web.js
var express = require("express");
var logfmt = require("logfmt");
var FB = require("fb");
var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.sendfile('/index.html', {root:__dirname});
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log(port);
	console.log("Listening on " + port);
});