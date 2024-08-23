import React, { useRef, useState,useEffect} from 'react';
import { Link, Navigate,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { baseURL } from './config'; // Adjust the import path as necessary
import setUpAxios from './setUpAxios';
function UserInfoSection({ userData }) {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);  // Create ref for the menu
const navigate=useNavigate();
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);  // Close the menu if click is outside
    }
  };
  
  const toggleUserInfo = () => {
    setIsOpen(true);
  };
  const closeMenu = () => {
   setIsOpen(null);
  };
  const handleLogout = async () => {
    try {
      // Make a logout request to your backend server
      setUpAxios();
      const response = await axios.post(`${baseURL}/logout`); // Adjust the URL based on your backend endpoint

      // Check if the logout was successful
      if (response.status === 200) {
        // Handle successful logout
        console.log('Logout successful');
        localStorage.setItem('firstLogin', "false");
        // Set the isLogged flag to false in local storage
        localStorage.setItem("loggedIn", "false");
        localStorage.removeItem("token");
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


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {userData ? (
        <div className="profileImageContainer" onClick={toggleUserInfo}>
          {userData.image ? (
            <img src={userData.image} alt={userData.name} className="profileImage" />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} className="profileIcon" size="2x" />
          )}
          {isOpen && (
            <div className="userMenu" ref={menuRef}>
              <div className="userMenuHeader">

    <span className="closeIcon" onMouseDown={closeMenu}>✖</span> 
  </div>
            <div className='menuProfile'>
      {userData.image ? (
            <img src={userData.image} alt={userData.name} className="profileImage" />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} className="profileIcon" size="2x" />
          )}
          <h4>{userData.name}</h4>
          <p>{userData.username}</p>

  </div>

  <div className="userMenuIcons">
    <ul>
    <li
  onMouseDown={() => {
    // Prompt user for input
    const input = prompt("Enter your Buffalo Milk prices");

    // Validate input and store in localStorage if it's a number
    if (input !== null) { // Check if the user pressed 'Cancel'
      const numberInput = Number(input);

      // Check if the input is a valid number
      if (!isNaN(numberInput) && isFinite(numberInput)) {
        localStorage.setItem("buffaloFatPrices", numberInput);
        alert("Fat prices stored successfully.");
      } else {
        alert("Please enter a valid number.");
      }
    }
  }}
>
  Buffalo prices
</li>

<li
  onMouseDown={() => {
    // Prompt user for input
    const input = prompt("Enter your Cow Milk prices");

    // Validate input and store in localStorage if it's a number
    if (input !== null) { // Check if the user pressed 'Cancel'
      const numberInput = Number(input);

      // Check if the input is a valid number
      if (!isNaN(numberInput) && isFinite(numberInput)) {
        localStorage.setItem("cowFatPrices", numberInput);
        alert("Fat prices stored successfully.");
      } else {
        alert("Please enter a valid number.");
      }
    }
  }}
>
  Cow prices
</li>

      <li onMouseDown={()=>{
        navigate("/buffalo/prices/snf")
      }}>Cow</li>
      <li>Hlo</li>
      <li>Hlo</li>
      <li onClick={handleLogout} className='logoutButton'>Logout</li>
    </ul>
  
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
