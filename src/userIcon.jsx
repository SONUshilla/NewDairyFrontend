import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserInfoSection from "./userinfo";
function UserIcon() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn") === "true");
  const [userData, setUserData] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

const navigate=useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/user-profile");
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
        <UserInfoSection userData={userData}/>
      ) : (
        <AccountCircleIcon onClick={toggleUserMenu} />
      )}
    </div>
  );
}

export default UserIcon;
