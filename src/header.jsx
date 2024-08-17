import React from "react";
import UserIcon from "./userIcon";
import { Routes,Route ,Link, Navigate,useNavigate} from "react-router-dom";
import Sidebar from "./sidebar"
import AddUserForm from "./adduser";
import { useState,useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'; // Import the add user icon
import { baseURL } from './config'; // Adjust the import path as necessary
import setUpAxios from "./setUpAxios";

function Header() {
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(false);
  const [check,setCheck]=useState(false);
  const navigate = useNavigate(); // Get the navigate function
  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        setUpAxios();
        const response = await axios.get(`${baseURL}/adminAuth`);
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
  useEffect(() => {
    const checkSession = async () => {
      console.log(check);
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${baseURL}/check-session`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          setCheck(true);
        }
      } catch (error) {
        setCheck(false);
      }
    };
    checkSession();
  }, []);

  const handleClick = () => {
    navigate("/login"); // Navigate to the /login page
  };


  return (
    <div class="header">
      <div className="logo">
      <Link className="logo-link" to={"/"}>
      <h1 className="logo-text">Dairy</h1>
      </Link>
      </div>
      <div>
      {check ? <Sidebar /> : null} 
      </div>
    <div className="header-icon">
    {admin && <Link className="addUser" to="/addUser">
        <FontAwesomeIcon icon={faUserPlus} /> ADD Customer
    </Link>}
    {user && <Link to={"/BothAuth"}>
      Admin account??
    </Link>}
    {check ? <UserIcon/> :  <button onClick={handleClick} style={{ color: "black" }}>Sign Up</button>} 
    </div>
    </div>
  );
}
export default Header;
