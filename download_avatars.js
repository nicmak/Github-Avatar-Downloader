
console.log('Welcome to the Github Avatar Downloader!');
var request = require('request');
var fs = require('fs');

function getRepoContributors(repoOwner, repoName, cb) {
  var GITHUB_USER = "nicmak";
  var GITHUB_TOKEN = "78e5f7f89507dc9ed0249387103067f5368e13e7";
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
         .pipe(fs.createWriteStream("avatars/"+ filePath + ".jpg")); 
  
};


getRepoContributors("jquery", "jquery", function(err, result) {
     console.log("Errors:", err);
  result.forEach(function(contri) {   //avatar represents result[i], loops over contributors and all their information
     console.log("Avatar_URL: ",contri['avatar_url'])
     downloadImageByURL(contri['avatar_url'], contri['login'])
  })
  //console.log("Result:", result);
});

//downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "kvirani")
