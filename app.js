var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const server = app.listen(process.env.PORT || 8090, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('github hooks app is listening at http://%s:%s', host, port);
});
 
app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json());
app.use('/issues/new', function(req, res) {
  console.log('有新的issue 👏');
  try {
    var payload = JSON.parse(req.body.payload)
    if (payload.action === 'opened' || payload.action === 'deleted') {
      require('./createReadme')
    }
  } catch (err) {
    console.log('some error has happend:', err)
  }
});
