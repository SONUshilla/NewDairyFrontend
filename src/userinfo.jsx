import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

function UserInfoSection({ userData }) {
  const [showUserInfo, setShowUserInfo] = useState(false);

  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
  };

  const handleLogout = async () => {
    try {
      // Make a logout request to your backend server
      const response = await axios.post('https://dairy-backend-7sc5.onrender.com/logout'); // Adjust the URL based on your backend endpoint

      // Check if the logout was successful
      if (response.status === 200) {
        // Handle successful logout
        console.log('Logout successful');
        localStorage.setItem('firstLogin', "false");
        // Set the isLogged flag to false in local storage
        localStorage.setItem("loggedIn", "false");
        window.location.reload();
        // Redirect the user to the login page
        <Navigate to="/login" />;
      } else {
        // Handle logout failure
        console.error('Logout failed');
      }
    } catch (error) {
      // Handle logout error
      console.error('Error occurred while logging out:', error);
    }
  };

  return (
    <div>
      {userData ? (
        <div className="profileImageContainer" onClick={toggleUserInfo}>
          {userData.image ? (
            <img src={userData.image} alt={userData.name} className="profileImage" />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} className="profileIcon" size="2x" />
          )}
          {showUserInfo && (
            <div className="userInfoModal">
              <div className="userInfoContent">
                <table className="userInfoTable">
                  <tbody className="tableData">
                    <tr>
                      <td>{userData.name}</td>
                    </tr>
                    <tr>
                      <td>{userData.username}</td>
                    </tr>
                    {/* Add more rows for additional user info if needed */}
                  </tbody>
                </table>
                <button onClick={handleLogout} className="logoutButton">Logout</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <FontAwesomeIcon icon={faUserCircle} className="profileIcon" size="2x" onClick={toggleUserInfo} />
      )}
    </div>
  );
}

export default UserInfoSection;
