import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userList.css';
import { baseURL } from './config';
import setUpAxios from './setUpAxios';

const UserList = ({ onSelectUser, component,selectedUser }) => {
  const [users, setUsers] = useState([]); // Initialize with an empty array
  const [selectedUserId, setSelectedUserId] = useState(""); // State for the selected user
  const [visible, setVisible] = useState(false); // State to toggle the dropdown visibility
useEffect(()=>{
  if(selectedUser)
  {
    setSelectedUserId(selectedUser);
  }
},[selectedUser]);
  // Fetch the list of users from the API on component mount
  useEffect(() => {
    setUpAxios();
    axios.get(`${baseURL}/users`)
      .then(response => {
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  // Function to handle user selection
  const handleUserSelect = (event) => {
    const userId = event.target.value;
    setSelectedUserId(userId);
    onSelectUser(userId); // Call parent callback with selected user ID
    setVisible(false);
  };

  return (
    <div class="user-dropdown">
      <div className='CustomUserList'>
       {selectedUserId ? <div className='CustomListMiddle'>
          {/* Display selected user or default user icon */}
          <p className='user-icon1'>
            {selectedUserId ? users.find(user => user.id === parseInt(selectedUserId))?.name[0] : 'A'}
          </p>
          <div>
            {/* Display selected user's name and email or default values */}
            <span>{selectedUserId ? users.find(user => user.id === parseInt(selectedUserId))?.name : 'Username'}</span>
            <p>{selectedUserId ? users.find(user => user.id === parseInt(selectedUserId))?.username : 'username@gmail.com'}</p>
          </div>
        </div> : <p>SELECT A CUSTOMER</p>}

        {/* Toggle Dropdown Arrow */}
        <p
          className='CustomListDownArrow'
          onClick={() => setVisible(!visible)}
        >
          {visible ? '▲' : '▼'}
        </p>
</div>
        {/* User List Dropdown */}
        {visible && (
          <div className='UserListMenu'>
            <ul>
              {users.map((user) => (
                <li key={user.id} value={user.id} onClick={() => handleUserSelect({ target: { value: user.id } })}>
                  <div className='CustomUserList2'>
                    <p className='user-icon2'>{user.name[0]}</p>
                    <div>
                      <span>{user.name}</span>
                      <p>{user.username}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
  );
};

export default UserList;
