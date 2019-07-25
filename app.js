var express = require('express');
var app = express();
const server = app.listen(process.env.PORT || 8090, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('github hooks app is listening at http://%s:%s', host, port);
});
app.use('/issues/new', function(req, res) {
  console.log('有新的issue', req.body)
  try {
    if (req.body.action === 'opened') {
      require('./createReadme')
    }
  } catch (err) {
    console.log('some error has happend:', err)
  }
});
