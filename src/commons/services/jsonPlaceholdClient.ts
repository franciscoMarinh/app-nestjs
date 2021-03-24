import axios, { AxiosInstance } from 'axios';

class JsonClient {
  public api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  }
}
export default JsonClient;
