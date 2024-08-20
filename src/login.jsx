import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { baseURL } from './config'; // Adjust the import path as necessary
import "./login.css";
import GoogleAuth from './GoogleAuthCallback';
const LoginPage = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;


  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/login`,
        { username: loginUsername, password: loginPassword }
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
  const handleGoogleLogin = () => {
    window.open(`${baseURL}/auth/google`, '_self');
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
        const { token } = response.data;

        // Store JWT and userId in local storage
        localStorage.setItem('token', token);
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
    if (loggedIn) navigate('/');
  }, [loggedIn, navigate]);

  const handle = () => {
    window.open(`${baseURL}/auth/google`, '_self');
  };

  return (
    <div className='fullBody'>
    <div className="card">
    <h1>LOGIN</h1>
    {error && <p className="error-message">{error}</p>}
    <div className="card-inputs">
      <p>Username</p>
      <input type="text" placeholder="username" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
      <p>Password</p>
      <input type="password" placeholder="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
    </div>
    <button className="loginButton" onClick={handleLogin}>Login</button>
    <div className="divider"><span>or</span></div>
    <GoogleAuth/>
    <p className="login-text">Don't have an account? <Link to="/register">Register here</Link></p>
    <br/>
    <p className="login-text">Admin register here? <Link to="/admin-register">Register here</Link></p>
  </div>
  </div>

  );
};

export default LoginPage;
