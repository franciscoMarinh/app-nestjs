import axios from 'axios';

export const jsonClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});
