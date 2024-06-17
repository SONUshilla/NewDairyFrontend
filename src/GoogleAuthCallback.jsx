import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleAuth = async () => {
      try {
        // Make a request to the backend to complete the authentication process
        const response = await axios.get('/auth/google/');
        // Assuming the backend sends user data upon successful authentication
        const userData = response.data.user;
        // Redirect to the home page or any other route after successful authentication
        navigate('/home');
      } catch (error) {
        // Handle authentication error
        console.error('Authentication failed:', error);
        // Redirect to the login page or show an error message
        navigate('/login');
      }
    };

    // Call the authentication handler when the component mounts
    handleGoogleAuth();
  }, [navigate]); // Depend on navigate to prevent useEffect from running in an infinite loop

  return (
    <div>
      <p>Redirecting...</p>
      {/* You can add a loading spinner or any other UI element here */}
    </div>
  );
};

export default GoogleAuthCallback;
