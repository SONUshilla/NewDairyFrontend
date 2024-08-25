import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import UserInfoSection from "./userinfo";
import UserProfile from "./userprofile";

function UserIcon() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleUserDataFetched = (data) => {
    setUserData(data);
  };

  const toggleUserMenu = () => {
    navigate("/login");
  };

  return (
    <div>
      <UserProfile onUserDataFetched={handleUserDataFetched} />
      {userData ? (
        <UserInfoSection userData={userData} />
      ) : (
        <FontAwesomeIcon icon={faUserCircle} onClick={toggleUserMenu} size="2x" />
      )}
    </div>
  );
}

export default UserIcon;
