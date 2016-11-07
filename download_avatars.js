
console.log('Welcome to the Github Avatar Downloader!');
var request = require('request');

function getRepoContributors(repoOwner, repoName, cb) {
	var GITHUB_USER = "nicmak";
	var GITHUB_TOKEN = "";
	var requestURL="https://" + GITHUB_USER + ":" + GITHUB_TOKEN + "@api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";

	var options = {url: requestURL, headers: {'User-Agent' : "GitHub Avatar-Student Project"}};
	var callback = function(err, response, body) {
 		cb(err, JSON.parse(body));
	};

	request(options, callback);
};

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  result.forEach(function(contri) {   //avatar represents result[i], loops over contributors and all their information
    console.log("Avatar_URL: ",contri['avatar_url'])
  })
  //console.log("Result:", result);
});
