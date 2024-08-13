import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faMoneyBill, faEye, faHomeAlt } from '@fortawesome/free-solid-svg-icons';
import "./Sidebar.css"; // Import CSS file for styling

function Sidebar() {
  const [activeIcon, setActiveIcon] = useState('home'); // Set default active icon

  const handleIconClick = (iconName) => {
    setActiveIcon(iconName);
  };

  return (
    <div className="sidebar">
      <Link 
        className={`sidebar-link ${activeIcon === 'home' ? 'active' : ''}`} 
        to="/" 
        onClick={() => handleIconClick('home')}
      >
         HOME
      </Link>
      <Link 
        className={`sidebar-link ${activeIcon === 'edit' ? 'active' : ''}`} 
        to="/entries" 
        onClick={() => handleIconClick('edit')}
      >
         ENTRIES
      </Link>
      <Link 
        className={`sidebar-link ${activeIcon === 'visibility' ? 'active' : ''}`} 
        to="/view-entries" 
        onClick={() => handleIconClick('visibility')}
      >
        VIEW ENTRIES
      </Link>
      <Link 
        className={`sidebar-link ${activeIcon === 'balance' ? 'active' : ''}`} 
        to="/balance" 
        onClick={() => handleIconClick('balance')}
      >
         BALANCE
      </Link>
    </div>
  );
}

export default Sidebar;
