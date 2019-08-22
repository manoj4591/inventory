import axios from 'axios';

export function getRepos() {
  return axios.get(`/bookStore.json`)
  .then(res => res.data)
}

// function getUserData(username) {
//   return axios.all([
//     axios.get(`${BASE_URL}/users/${username}`),
//     axios.get(`${BASE_URL}/users/${username}/orgs`),
//   ])
//   .then(([user, orgs]) => ({
//     user: user.data,
//     orgs: orgs.data,
//   }));
// }