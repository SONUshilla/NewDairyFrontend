import React, { useState } from 'react';
import './adminLogin.css'; // Import CSS for styling
import axios from 'axios'; // Don't forget to import axios

function SuperUserPage() {
  // State variables for form fields and messages
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [dairyNumber, setDairyNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validation logic
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Form data to be sent to the server
      const formData = {
        name,
        contact,
        dairyNumber,
        address,
        password
      };

      // Send form data to backend
      const response = await axios.post('https://dairy-backend-7sc5.onrender.com/register-admin', formData);

      // Reset form fields
      setName('');
      setContact('');
      setDairyNumber('');
      setAddress('');
      setPassword('');
      setConfirmPassword('');

      // Display success message
      setSuccessMessage(response.data.message);
    } catch (error) {
      // Display error message
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="superuser-container">
      <h2>Superuser Registration</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Mobile Number or Email:</label>
          <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Dairy Number:</label>
          <input type="text" value={dairyNumber} onChange={(e) => setDairyNumber(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default SuperUserPage;
