import axios from 'axios';

// Function to set up Axios with the token in the headers
const setUpAxios = () => {
  axios.defaults.withCredentials = true;
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default setUpAxios;
