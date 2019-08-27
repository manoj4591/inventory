import axios from 'axios';

export function getRepos() {
  return axios.get(`/bookStore.json`)
  .then(res => res.data)
}