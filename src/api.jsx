// api.js

import axios from 'axios';

const baseURL = 'https://localhost:5000/';

const api = axios.create({
  baseURL: baseURL,
});

export default api;
