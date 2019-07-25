var request = require('request');
var path = require('path');
var fs = require('fs');
var execSync = require('child_process').execSync;
var moment = require('moment');
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
      let issues = `
 > daily-study 每日一问
#### issues`;
      try {
        body = JSON.parse(body);
        const splitByDate = new Map();
        body.forEach(i => {
          const date = moment(i.created_at).format('YYYY-MM-DD');
          if (!splitByDate.get(date)) {
            splitByDate.set(date, [i]);
          } else {
            splitByDate.get(date).push(i);
          }
        });
        splitByDate.forEach((item, date) => {
          let dateString = `\r\n* #### ${date}`;
          item.forEach(i => {
            dateString += `\r\n [${i.title}](${i.html_url}) （\`Created by\` [${i.user.login}](${i.user.html_url})）\r\n`;
          });
          issues += dateString;
        });
        fs.writeFile(path.dirname(__filename) + '/README.md', issues, () => {
          console.log('create successful!');
          const date = moment().format('YYYY-MM-DD')
          execSync("git add README.md")
          execSync(`git commit -m "${date} new daily 💐💐👏👏"`)
          execSync('git push origin master')
        });
      } catch (err) {
        console.log('something error: ', err);
      }
    }
  }
);
