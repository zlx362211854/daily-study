var request = require('request');
var path = require('path');
var fs = require('fs');
request(
  {
    url: 'https://api.github.com/repos/zlx362211854/daily-study/issues',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.122 Safari/537.36 SE 2.X MetaSr 1.0'
    }
  },
  (error, response, body = []) => {
    if (!error && response.statusCode == 200 && body) {
      try {
        body = JSON.parse(body);
        let issues = `
> daily-study 每日一问
#### issues
        `;
        body.forEach(i => {
          issues += `\r\n ${i.number}. [${i.title}](${i.url})`;
        });
        fs.writeFile(path.dirname(__filename) + '/README.md', issues, () => {
          console.log('success');
        });
      } catch (err) {
        console.log('something error: ', err);
      }
    }
  }
);
