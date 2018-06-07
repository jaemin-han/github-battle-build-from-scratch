
import axios from 'axios';

const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
// Sting Template
const params = `?client_id=${id}&client_secret=${sec}`;

// PROMISE
// Make a 'Get' request to the url below
// Axios will return a promise by returning an object that has a .then() property
async function getProfile (username) {
  const profile = await axios.get(`https://api.github.com/users/${username}${params}`)
    // When this function is invoked, it's going to pass a user or whatever we get from github api
    // but it will only going to be invoked after we get the information back
    return profile.data
      // .then(({ data }) => data);
}

function getRepos (username) {
  return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`);
}

function getStarCount (repos) {
  // basically when you get the information back from github api, then... call the function and pass us whatever the information (in this case User)
  return repos.data.reduce((count, { stargazers_count }) => count +stargazers_count, 0);
  // Arrow function and implicit return
}
// Reduce - allows us to take an array and reduce it to a single value
// Initially pass a ZERO
// we want to take repos.data and reduce to a single number... start from 0 
// repo is going to be the first item in repos.data
// things that are returned are going to be passed as 'count' + stargazers count.
// once there is no more item to iterate over, we're going to have a total number or how many stars
// are in repos.data

function calculateScore ({ followers }, repos) {
  return (followers * 3) + getStarCount(repos);
}

function handleError (error) {
  console.warn(error);
  return null;
}

async function getUserData (player) {
  const [ profile, repos] = await Promise.all([
    getProfile(player),
    getRepos(player)
    // Arrow function, destructuring arrays and returning object
  ])

  return {
  //Shorthand notation
    profile,
    score: calculateScore(profile, repos)
  }

  // Native Promises for ES6
  // return Promise.all([
  //   getProfile(player),
  //   getRepos(player)
    // Arrow function, destructuring arrays and returning object
  // ]).then(([profile, repos ]) => ({
    //Shorthand notation
      // profile,
      // score: calculateScore(profile, repos)
  // }))
}
// Arrow function and implicit return
function sortPlayers (players) {
  return players.sort((a,b) => b.score - a.score);
}

// Just exporting two functions - if we need to import these two functions, 
// import { fetchPopularRepos} from '../api' as example
export async function battle (players) {
  const results = await Promise.all(players.map(getUserData))
    .catch(handleError);

    return results === null
      ? results
      : sortPlayers(results);

      // Deleted for async/await refactoring
    // return Promise.all(players.map(getUserData))
    //   .then(sortPlayers)
    //   .catch(handleError);
}

export async function fetchPopularRepos (language) {
    const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
    
    const repos = await axios.get(encodedURI)
      .catch(handleError);

    return repos.data.items

    // Deleted for async/await refactoring
    // return axios.get(encodedURI).then(({ data }) => data.items);
}

// Objects with two different properties Example ONE
// module.exports = {
//   battle (players) {
//     return Promise.all(players.map(getUserData))
//       .then(sortPlayers)
//       .catch(handleError);
//   },
      // battle to return a promise. When it is resolved, it will going to have all players' info
    // map over players, 'getUserData' which will call 'getProfile' and 'getRepos'.
    // once we get those info, return 'profile' and 'score' objects
    // then sort array in the 'sortPlayers' function

  // Removed function keywords
  // fetchPopularRepos (language) {
    // Using template string
//     const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

//     return axios.get(encodedURI).then(({ data }) => data.items);
//   }
// };