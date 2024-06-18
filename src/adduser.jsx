import React, { useState } from 'react';
import axios from 'axios';
import './addUser.css'; // Import CSS file for styling
import { baseURL } from './config'; // Adjust the import path as necessary
const AddUserForm = () => {
  const [formData, setFormData] = useState({
    mobileEmail: '',
    name: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Reset password match error when user types in password or confirm password field
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordMatchError(false);
    }
    // Reset login error when user types in mobile/email field
    if (name === 'mobileEmail') {
      setLoginError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
    // Send form data to backend
    try {
      const response = await axios.post(`${baseURL}/addUser`, formData);
      console.log(response.data); // Handle success response
    } catch (error) {
      console.error('Error adding user:', error); // Handle error
      if (error.response && error.response.data && error.response.data.error) {
        setLoginError(error.response.data.error); // Set login error message from backend
      } else {
        setLoginError('An error occurred. Please try again later.'); // Generic error message
      }
    }
  };

  return (
    <form className="add-user-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="mobile-email"><i className="fas fa-mobile-alt"></i> Mobile Number or Email</label>
        <input type="text" id="mobile-email" name="mobileEmail" value={formData.mobileEmail} onChange={handleChange} required />
      </div>
      <div className="input-group">
        <label htmlFor="name"><i className="fas fa-user"></i> Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="input-group">
        <label htmlFor="password"><i className="fas fa-lock"></i> Password</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      <div className="input-group">
        <label htmlFor="confirm-password"><i className="fas fa-lock"></i> Confirm Password</label>
        <input type="password" id="confirm-password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        {passwordMatchError && <p className="error-message">Passwords do not match</p>}
      </div>
      {loginError && <p className="error-message">{loginError}</p>} {/* Display login error message */}
      <button type="submit"><i className="fas fa-user-plus"></i> Add User</button>
    </form>
  );
};

export default AddUserForm;
