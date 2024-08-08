import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import UserInfoSection from "./userinfo";
import { baseURL } from './config'; // Adjust the import path as necessary
import setUpAxios from "./setUpAxios";
function UserIcon() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn") === "true");
  const [userData, setUserData] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setUpAxios();
        const response = await axios.get(`${baseURL}/user-profile`);
        console.log(response);
        setUserData(response.data.userProfile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserData();
  }, [loggedIn]);

  const toggleUserMenu = () => {
    navigate("/login");
  };

  return (
    <div>
      {userData ? (
        <UserInfoSection userData={userData} />
      ) : (
        <FontAwesomeIcon icon={faUserCircle} onClick={toggleUserMenu} size="2x" />
      )}
    </div>
  );
}

export default UserIcon;
