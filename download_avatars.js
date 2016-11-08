const dotEnv = require('dotenv')
dotEnv.config();
const username = process.env.USER
const password = process.env.TOKEN



//require('dotenv').config()
console.log('Welcome to the Github Avatar Downloader!');
const request = require('request');
const fs = require('fs');
const input = process.argv.slice(2);




function getRepoContributors(repoOwner, repoName, cb) {
  const requestURL="https://" + username + ":" + password + "@api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";

  const options = {
    url: requestURL,
    headers: {'User-Agent' : "GitHub Avatar-Student Project"}
  };
  // const callback = function(err, response, body) {
  //   cb(err, JSON.parse(body));
  //};

  request(options, cb);
};

function downloadImageByURL(url, filePath) { //use url as request URL
  //fs.mkdirSync("avatars");
  request.get(url)
    .on('error', function (err) {
    throw err;
    })
    .pipe(fs.createWriteStream("Avatars/"+ filePath + ".jpg"));

};


getRepoContributors(input[0], input[1], function(err, response, body) {
  const bodyJSON = JSON.parse(body);
  console.log("Errors:", err);
  bodyJSON.forEach(function(contrib) {   //avatar represents result[i], loops over contributors and all their information
     console.log("Avatar_URL: ",contrib['avatar_url'])
     downloadImageByURL(contrib['avatar_url'], contrib['login'])
  })
  //console.log("Result:", result);
});

//downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "kvirani")
