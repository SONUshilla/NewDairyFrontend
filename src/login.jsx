import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { baseURL } from './config'; // Adjust the import path as necessary

const LoginPage = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    // Add interceptor to include the JWT and userId in all requests
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        if (userId) {
          config.headers['userId'] = userId;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/login`,
        { username: loginUsername, password: loginPassword },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      
      if (response.status === 200) {
        // Successful login
        setLoggedIn(true);
        localStorage.setItem('loggedIn', 'true');

        // Extract JWT and userId from the response
        const { token } = response.data;

        // Store JWT and userId in local storage
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

        window.location.reload();
      } else {
        console.error('Login failed');
        localStorage.setItem('loggedIn', 'false');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
        localStorage.setItem('loggedIn', 'false');
      }
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${baseURL}/register`, {
        username: registerUsername,
        password: registerPassword,
      });
      if (response.status === 201) {
        setLoggedIn(true);
        localStorage.setItem('loggedIn', 'true');
        window.location.reload();
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
        localStorage.setItem('loggedIn', 'false');
      }
    }
  };

  useEffect(() => {
    if (loggedIn) navigate('/home');
  }, [loggedIn, navigate]);

  const handle = () => {
    window.open(`${baseURL}/auth/google`, '_self');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        {error && <p className="error-message">{error}</p>}
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>

        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={registerUsername}
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>

        <div className="login-options">
          <Link to="/admin">Admin? Login here</Link>
          <button onClick={handle}>
            <FaGoogle className="icon" /> Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
