var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var execSync = require('child_process').execSync;
var request = require('request');
const server = app.listen(process.env.PORT || 8090, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('github hooks app is listening at http://%s:%s', host, port);
});

app.use(bodyParser.urlencoded({ extend: false }));
app.use(bodyParser.json());
app.use('/issues/new', function(req, res) {
  console.log('有新的issue 👏');
  try {
    var payload = JSON.parse(req.body.payload);
    if (payload.action === 'opened' || payload.action === 'deleted') {
      if (payload.action === 'opened') {
        request.post(
          'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=b23250ea-d4b1-4060-8322-ad6781898cd5',
          {
            form: {
              msgtype: 'markdown',
              markdown: {
                "content": `> ${payload.sender.login} created a new issue \r\n\r\n [Click here for details](${payload.issue.url})`
              }
            }
          },
          (error, response, body = []) => {
            if (!error && response.statusCode == 200 && body) {
              console.log('successful send messgae to wechat');
            }
          }
        );
      }
      execSync('node ./createReadme.js');
    }
  } catch (err) {
    console.log('some error has happend:', err);
  }
});
