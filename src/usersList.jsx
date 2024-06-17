import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './userList.css'; // Import CSS module for styling
import Showdate from './showDate';

const UserList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(""); // State to store the ID of the selected user

  useEffect(() => {
    // Fetch the list of users from the API endpoint
    axios.get('/users')
      .then(response => {
        setUsers(response.data); // Update state with the fetched users
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once

  // Function to handle user selection from dropdown
  const handleUserSelect = (event) => {
    const userId = event.target.value;
    setSelectedUserId(userId);
    onSelectUser(userId); // Call the onSelectUser function with the selected user ID
  };

  return (
    <div className="userList">
      <select value={selectedUserId} onChange={handleUserSelect}>
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>{user.username}</option>
        ))}
      </select>
    </div>
  );
};

export default UserList;
