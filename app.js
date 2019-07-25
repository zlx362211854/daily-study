var express = require('express');
var app = express();
const server = app.listen(PORT || 8090, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('github hooks app is listening at http://%s:%s', host, port);
});
app.get('/issues/new', function(req, res) {
  console.log('有新的issue')
  require('./createReadme')
});
