
console.log('Welcome to the Github Avatar Downloader!');
var request = require('request');
var fs = require('fs');
var input = process.argv.slice(2);

function getRepoContributors(repoOwner, repoName, cb) {
  var GITHUB_USER = "nicmak";
  var GITHUB_TOKEN = ""; //Email nicholas123mak@gmail.com for token 
  var requestURL="https://" + GITHUB_USER + ":" + GITHUB_TOKEN + "@api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";

  var options = {url: requestURL, headers: {'User-Agent' : "GitHub Avatar-Student Project"}};
  var callback = function(err, response, body) {
    cb(err, JSON.parse(body));
  };

  request(options, callback);
};

function downloadImageByURL(url, filePath) { //use url as request URL
  //fs.mkdirSync("avatars");
  request.get(url)
         .on('error', function (err) {
          throw err;
         })
         .pipe(fs.createWriteStream("Avatars/"+ filePath + ".jpg")); 
  
};


getRepoContributors(input[0], input[1], function(err, result) {
     console.log("Errors:", err);
  result.forEach(function(contri) {   //avatar represents result[i], loops over contributors and all their information
     console.log("Avatar_URL: ",contri['avatar_url'])
     downloadImageByURL(contri['avatar_url'], contri['login'])
  })
  //console.log("Result:", result);
});

//downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "kvirani")
