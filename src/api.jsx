// api.js

import axios from 'axios';

const baseURL = 'https://new-dairy.onrender.com';

const api = axios.create({
  baseURL: baseURL,
});

export default api;
