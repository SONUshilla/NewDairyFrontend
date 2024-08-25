import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from './config'; // Adjust the import path as necessary
import setUpAxios from "./setUpAxios";

function UserProfile({ onUserDataFetched }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setUpAxios();
        const response = await axios.get(`${baseURL}/user-profile`);
        setUserData(response.data.userProfile);
        onUserDataFetched(response.data.userProfile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserData();
  }, []);

  return null; // This component does not render anything itself
}

export default UserProfile;
