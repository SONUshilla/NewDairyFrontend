// api.js

import axios from 'axios';

const baseURL = 'https://dairy-backend-7sc5.onrender.com/';

const api = axios.create({
  baseURL: baseURL,
});

export default api;
