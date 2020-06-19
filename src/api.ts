import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

const instance = axios.create({
  baseURL: 'https://api.github.com',
  adapter: process.env.NODE_ENV === 'test' && httpAdapter
})

export default {
  searchUser(username: string) {
    return instance
      .get(`/users/${username}`)
      .then(result => result.data)
  }
}
