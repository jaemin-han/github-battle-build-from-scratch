var axios = require('axios');
var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var params = "?client_id=" + id + "&client_secret=" + sec;

// PROMISE
// Make a 'Get' request to the url below
// Axios will return a promise by returning an object that has a .then() property
function getProfile (username) {
  return axios.get('https://api.github.com/users/' + username + params)
    // When this function is invoked, it's going to pass a user or whatever we get from github api
    // but it will only going to be invoked after we get the information back
    .then(function (user) {
      return user.data;
    });
}

function getRepos (username) {
  return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100');
}
// basically when you get the information back from github api, then... call the function and pass us whatever the information (in this case User)
function getStarCount (repos) {
  return repos.data.reduce(function (count, repo) {
    return count + repo.stargazers_count
  }, 0);
}
// Reduce - allows us to take an array and reduce it to a single value
// Initially pass a ZERO
// we want to take repos.data and reduce to a single number... start from 0 
// repo is going to be the first item in repos.data
// things that are returned are going to be passed as 'count' + stargazers count.
// once there is no more item to iterate over, we're going to have a total number or how many stars
// are in repos.data


function calculateScore (profile, repos) {
  var followers = profile.followers;
  var totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

function handleError (error) {
  console.warn(error);
  return null;
}

function getUserData (player) {
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then(function (data) {
    var profile = data[0];
    var repos = data[1];

    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  });
}

function sortPlayers (players) {
  return players.sort(function (a,b) {
    return b.score - a.score;
  });
}

module.exports = {
  battle: function (players) {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError);
  },
    // battle to return a promise. When it is resolved, it will going to have all players' info
    // map over players, 'getUserData' which will call 'getProfile' and 'getRepos'.
    // once we get those info, return 'profile' and 'score' objects
    // then sort array in the 'sortPlayers' function
  fetchPopularRepos: function (language) {
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

    return axios.get(encodedURI)
      .then(function (response) {
        return response.data.items;
      });
  }
};