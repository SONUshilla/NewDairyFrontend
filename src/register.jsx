import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { baseURL } from './config'; // Adjust the import path as necessary
import './login.css'; // Use the same stylesheet

const RegisterPage = () => {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${baseURL}/register`, { username: registerUsername, password: registerPassword });
      if (response.status === 201) {
        const { token } = response.data;
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('token', token);
        navigate('/login');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  const handleGoogleRegister = () => {
    window.open(`${baseURL}/auth/google`, '_self');
  };

  return (
    <div className='fullBody'>
    <div className="card">
      <h1>REGISTER</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="card-inputs">
        <p>Username</p>
        <input type="text" placeholder="username" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} />
        <p>Password</p>
        <input type="password" placeholder="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
      </div>
      <button onClick={handleRegister}>Register</button>
      <div className="divider"><span>or</span></div>
      <button className="google-button" onClick={handleGoogleRegister}>
        <FaGoogle className="icon" /> Register with Google
      </button>
      <p className="login-text">Already have an account? <Link to="/login">Login here</Link></p>
    </div>
    </div>
  );
};

export default RegisterPage;
