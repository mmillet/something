/**
 * Created by zhengguo.chen on 2016/4/26.
 */
var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/event', function(req, res) {
  res.setHeader("Content-Type", "text/event-stream");
  res.write("data: {\"now\":\"" + new Date()+"\",\"success\":true}\r\n\r\n");
  res.end();
});

app.listen(8080);