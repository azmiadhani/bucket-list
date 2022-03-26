import axios from 'axios';
const BASE_URL = 'http://localhost:8001/';

// @desc  default config for axios
export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// @desc  this axiosPrivate gonna have interceptors
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
