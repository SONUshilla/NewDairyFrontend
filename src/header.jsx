import React from "react";
import UserIcon from "./userIcon";
import { Routes,Route ,Link} from "react-router-dom";
import Sidebar from "./sidebar"
import AddUserForm from "./adduser";
import { useState,useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'; // Import the add user icon


function Header() {
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const response = await axios.get('/adminAuth');
        if (response.status === 200) {
          setAdmin(true);
        }else if(response.status === 205){
          setUser(true);
        } else {
          setAdmin(false);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setAdmin(false);
      }
    };

    fetchAdminStatus();
  }, []);
  return (
    <div class="header">
      <div className="logo">
      <Link className="logo-link" to={"/"}>
      <h1 className="logo-text">Dairy</h1>
      </Link>
      </div>
    <div className="header-icon">
    {admin && <Link to="/addUser">
        <FontAwesomeIcon icon={faUserPlus} />
    </Link>}
    {user && <Link to={"/BothAuth"}>
      Admin account??
    </Link>}
      <UserIcon/>
    </div>
    </div>
  );
}
export default Header;
