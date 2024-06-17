import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Showdate from "./showDate";
import Sidebar from "./sidebar";
import Entry from "./entry";
import Balance from "./balance";
import LoginPage from "./login";
import GoogleAuthCallback from "./GoogleAuthCallback";
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

function Main() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
  const [check, setCheck] = useState(loggedIn);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [admin, setAdmin] = useState( localStorage.getItem("admin")==="true");
  const [user, setuser] = useState(false);
  useEffect(() => {
    const checkSession = async () => {
      {console.log(check)}
      try {
        const response = await axios.get('/check-session');
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
        const response = await axios.get('/adminAuth');
        if (response.status === 200) {
          setAdmin(true);
          localStorage.removeItem("user");
        } else if(response.status===205){
          localStorage.setItem("user","true");
          localStorage.removeItem("admin");
          setuser(true);
        }else  {
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
      <div >
        <Header />
        <div className="header-link">
          {check && <Sidebar />}
        </div>
      </div>
      
        <div className="main">
          <Routes>
            <Route exact path="/" element={<Home isLoggedIn ={loggedIn}/>} />
            <Route path="view-entries" element={loggedIn ? <Showdate /> : <Navigate to="/login" />} />
            <Route path="/balance" element={loggedIn ? <Balance /> : <Navigate to="/login" />} />
            <Route path="/entries/*" element={loggedIn ? <Entry /> : <Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<SuperUserPage/>} />
            <Route path="/addUser" element={admin && <AddUserForm/>}/>
            <Route path="/UserBoth" element={user && <UserBoth/>} />
            <Route path="/BothAuth" element={user && <BothAuthComponent/>} />
            <Route path="/buffalo/prices" element={<FatPrices tableTitle={"buffalo"}/>}/>
            <Route path="/cow/prices" element={<FatPrices tableTitle={"Cow"}/>}/>
            <Route path="/buffalo/prices/snf" element={<CowPriceEntryGrid/>}/>
            <Route path="/cow/prices/snf" element={<BuffaloPriceEntryGrid/>}/>
         </Routes>
        </div>
    </div>
  );
}

export default Main;
