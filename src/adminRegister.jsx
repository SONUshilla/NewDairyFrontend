import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { baseURL } from './config'; // Adjust the import path as necessary
import './login.css'; // Use the same stylesheet

const AdminRegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    dairyNumber: '',
    address: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdminRegister = async () => {
    try {
      const response = await axios.post(`${baseURL}/admin/register`, formData);
      if (response.status === 201) {
        const { token } = response.data;
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('token', token);
        navigate('/admin/dashboard');
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
      <h1>Admin Registration</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="card-inputs">
        <p>Name</p>
        <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleInputChange} />
        <p>Contact</p>
        <input type="tel" name="contact" placeholder="Enter your contact number" value={formData.contact} onChange={handleInputChange} />
        <p>Dairy Number</p>
        <input type="text" name="dairyNumber" placeholder="Enter your dairy number" value={formData.dairyNumber} onChange={handleInputChange} />
        <p>Address</p>
        <input type="text" name="address" placeholder="Enter your address" value={formData.address} onChange={handleInputChange} />
        <p>Password</p>
        <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleInputChange} />
        <p>Confirm Password</p>
        <input type="password" placeholder="Confirm your password" />
      </div>
      <button onClick={handleAdminRegister}>Register</button>
      <div className="divider"><span>or</span></div>
      <button className="google-button" onClick={handleGoogleRegister}>
        <FaGoogle className="icon" /> Register with Google
      </button>
      <p className="login-text">Already have an account? <Link to="/admin">Login here</Link></p>
    </div>
    </div>
  );
};

export default AdminRegisterPage;
