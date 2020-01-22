import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';
export const HTTP = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});
