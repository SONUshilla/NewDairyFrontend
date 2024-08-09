import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ViewEntries from "./viewEntries";
import Sidebar from "./sidebar";
import Entry from "./entry";
import Balance from "./balance";
import LoginPage from "./login";
import axios from "axios";
import Home from "./home";
import Header from "./header";
import SuperUserPage from "./adminLogin";
import AddUserForm from "./adduser";
import UserBoth from "./associatedAdmin";
import BothAuthComponent from "./bothAuth";
import BuffaloPriceEntryGrid from "./snfPrice";
import FatPrices from "./FatInputs";
import CowPriceEntryGrid from "./CowPriceEntryGrid";
import { baseURL } from './config'; // Adjust the import path as necessary
import setUpAxios from './setUpAxios'; // Import the setup function
import RegisterPage from "./register";
import AdminRegisterPage from "./adminRegister";

function Main() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
  const [check, setCheck] = useState(loggedIn);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [admin, setAdmin] = useState(localStorage.getItem("admin") === "true");
  const [user, setUser] = useState(false);

  useEffect(() => {
    setUpAxios(); // Set up Axios with the token in the headers

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
          localStorage.setItem('loggedIn', 'true');
          setLoggedIn(true);
          setCheck(true);
        } else {
          localStorage.setItem('loggedIn', 'false');
        }
      } catch (error) {
        setLoggedIn(false);
        setCheck(false);
        localStorage.setItem('loggedIn', 'false');
      } finally {
        setLoading(false); // Set loading state to false after session check is completed
      }
    };

    checkSession();

    const intervalId = setInterval(checkSession, 6 * 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const response = await axios.get(`${baseURL}/adminAuth`);
        if (response.status === 200) {
          setAdmin(true);
          localStorage.removeItem("user");
        } else if (response.status === 205) {
          localStorage.setItem("user", "true");
          localStorage.removeItem("admin");
          setUser(true);
        } else {
          setAdmin(false);
          localStorage.removeItem("user");
          localStorage.removeItem("admin");
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setAdmin(false);
      }
    };

    fetchAdminStatus();
  }, []);

  // Render loading indicator if still loading
  if (loading) {
    return <div className="full">Loading...</div>;
  }

  // Render routes once loading is completed
  return (
    <div className="full">
      <div>
        <Header />
     
      </div>
      <div className="main">
        <Routes>
          <Route exact path="/" element={<Home isLoggedIn={loggedIn} />} />
          <Route path="view-entries" element={loggedIn ? <ViewEntries /> : <Navigate to="/login" />} />
          <Route path="/balance" element={loggedIn ? <Balance /> : <Navigate to="/login" />} />
          <Route path="/entries/*" element={loggedIn ? <Entry /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage/>}></Route>
          <Route path="/admin-register" element={<AdminRegisterPage/>}></Route>
          <Route path="/admin" element={<SuperUserPage />} />
          <Route path="/addUser" element={admin && <AddUserForm />} />
          <Route path="/UserBoth" element={user && <UserBoth />} />
          <Route path="/BothAuth" element={user && <BothAuthComponent />} />
          <Route path="/buffalo/prices" element={<FatPrices tableTitle={"buffalo"} />} />
          <Route path="/cow/prices" element={<FatPrices tableTitle={"Cow"} />} />
          <Route path="/buffalo/prices/snf" element={<CowPriceEntryGrid />} />
          <Route path="/cow/prices/snf" element={<BuffaloPriceEntryGrid />} />
        </Routes>
      </div>
    </div>
  );
}

export default Main;
