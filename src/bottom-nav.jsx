import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Import CSS file for styling

function BottomBar() {
  const [activeIcon, setActiveIcon] = useState("home"); // Set default active icon

  const handleIconClick = (iconName) => {
    setActiveIcon(iconName);
  };

  return (
    <div className="bottom-nav">
      <Link className="bottom-nav-link" to="/">
        <span
          className={`material-symbols-rounded ${activeIcon === 'home' ? 'active' : ''}`}
          onClick={() => handleIconClick('home')}
        >
          home
        </span>
      </Link>
      <Link className="bottom-nav-link" to="/entries">
        <span
          className={`material-symbols-rounded ${activeIcon === 'edit' ? 'active' : ''}`}
          onClick={() => handleIconClick('edit')}
        >
          edit
        </span>
      </Link>
      <Link className="bottom-nav-link" to="/view-entries">
        <span
          className={`material-symbols-rounded ${activeIcon === 'visibility' ? 'active' : ''}`}
          onClick={() => handleIconClick('visibility')}
        >
          visibility
        </span>
      </Link>
      <Link className="bottom-nav-link" to="/balance">
        <span
          className={`material-symbols-rounded ${activeIcon === 'account_balance' ? 'active' : ''}`}
          onClick={() => handleIconClick('account_balance')}
        >
          account_balance
        </span>
      </Link>
    </div>
  );
}

export default BottomBar;
