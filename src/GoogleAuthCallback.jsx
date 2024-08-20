import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import { baseURL } from './config'; // Adjust the import path as necessary

const clientId = '52798891502-335tpaser7uatbprq1upm5kpmafn2qr4.apps.googleusercontent.com'; // Replace with your Google Client ID

const GoogleAuth = () => {
  const handleSuccess = async (response) => {
    try {
      const idToken = response.credential;
      const userInfo = jwtDecode(idToken);

      const dataToSend = {
        idToken,
        user: {
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
        },
      };
      const backendResponse = await axios.post(`${baseURL}/auth/google/callback`, dataToSend);
      const { token, user } = backendResponse.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = '/';
    } catch (error) {
      console.error('Error sending data to the backend:', error);
    }
  };

  const handleFailure = (error) => {
    console.error('Google login failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        <h2>Login with Google</h2>
        <GoogleLogin
          onSuccess={handleSuccess}
          onFailure={handleFailure}
          useOneTap
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
