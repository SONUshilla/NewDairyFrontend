import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Showdate from './showDate';
import { Navigate } from 'react-router-dom';
import UserBoth from './associatedAdmin';

const BothAuthComponent = () => {
  const [userId, setUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Function to fetch user ID from backend
    const fetchUserId = async () => {
      try {
        // Make a GET request to the backend route
        const response = await axios.get('/bothAuth');
        // If successful, set the user ID
        setUserId(response.data.user_id);
      } catch (error) {
        // If error, set the error message
        setErrorMessage(error.response.data.error);
        
      }
    };

    // Call the fetchUserId function when the component mounts
    fetchUserId();
  }, []);

  return (
    <div>
      {userId ? (
        <Showdate userId={userId}/>
      ) : (<>
        <p>{errorMessage || 'Loading...'}</p>

        Login to proceed 

        
        <UserBoth/>
        </>
      )}
    </div>
  );
};

export default BothAuthComponent;
