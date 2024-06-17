import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faMoneyBill,faEye } from '@fortawesome/free-solid-svg-icons';
import "./Sidebar.css"; // Import CSS file for styling

function Sidebar() {
  return (
    <div className="sidebar">
      <Link className="sidebar-link" to="/">HOME</Link>
      <Link className="sidebar-link" to="/entries">
        <FontAwesomeIcon icon={faPen} /> ENTRIES
      </Link>
      <Link className="sidebar-link" to="/view-entries"><FontAwesomeIcon icon={faEye}/>VIEW ENTRIES</Link>
      <Link className="sidebar-link" to="/balance"><FontAwesomeIcon icon={faMoneyBill} /> BALANCE</Link>
    </div>
  );
}

export default Sidebar;
