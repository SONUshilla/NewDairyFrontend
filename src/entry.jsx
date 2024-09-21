import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, Outlet } from "react-router-dom";
import DateRange from "./dates";
import Table from "./Table";
import DefaultEntry from "./DefaultEntry";
import DefaultMilk from "./DefaultMilk";
import UserList from "./usersList";
import axios from "axios";
import { baseURL } from './config'; // Adjust the import path as necessary
import "./entry.css";
import BuffaloPriceEntryGrid from "./snfPrice";
import FatPrices from "./FatInputs";
import CowPriceEntryGrid from "./CowPriceEntryGrid";

function Entry() {
  const [activeItem, setActiveItem] = useState("milk");
  const [datesBetween, setDatesBetween] = useState([]);
  const [DateSelect, setDateSelect] = useState(false);
  const [text, setText] = useState("Multiple");
  const [path, setPath] = useState("table");
  const [userId, setUserId] = useState(""); // State to store the selected user ID
  const [admin, setAdmin] = useState(false);
  const [active, setActive] = useState('milk'); // Default active is 'milk'
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 850);
  const navigate = useNavigate();

  const handleNavigation = (path, item) => {
    navigate(path);
    setActiveItem(item); // Set the active item
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 850);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const response = await axios.get(`${baseURL}/adminAuth`);
        console.log(response.status);
        if (response.status === 200) {
          setAdmin(true);
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

  function setting(array) {
    setDatesBetween(array);
  }
  
  // Function to handle user selection from UserList
  const handleUserSelect = (selectedUserId) => {
    setUserId(selectedUserId);
  };

  const handleToggleDateSelect = () => {
    setDateSelect(!DateSelect);
    setText(DateSelect ? "Enter Multiple" : "Back");
    setPath(DateSelect ? "table" : "");
  };
  
  return (
    <>
      {isSmallScreen ? (
        <div className="container1">
          <div className="userlist1">
            {admin && <UserList onSelectUser={handleUserSelect} />}
          </div>
          <div className="toggleBar">
            <p
              className={active === 'milk' ? 'active' : ''}
              onClick={() => navigate("/entries/milkEntries")}
            >
              Milk Entries
            </p>
            <p
              className={active === 'others' ? 'active' : ''}
              onClick={() => navigate("/entries/other")}
            >
              Others
            </p>
          </div>
          <div className="DefaultSmall">
            <div className="form2">
              <Routes>
                <Route path="*" element={<DefaultMilk userId={userId} smallScreen={isSmallScreen} />} />
                <Route path="/Other" element={<DefaultEntry userId={userId} />} />
                <Route path="/buffalo/prices" element={<FatPrices tableTitle="buffalo" />} />
                <Route path="/cow/prices" element={<FatPrices tableTitle="Cow" />} />
                <Route path="/buffalo/prices/snf" element={<BuffaloPriceEntryGrid tableTitle="buffalo-snf" />} />
                <Route path="/cow/prices/snf" element={<CowPriceEntryGrid tableTitle="cow-snf" />} />
              </Routes>
            </div>
          </div>

          <div className="main1">
            {DateSelect && (
              <>
                <div className="DateSelector">
                  <Routes>
                    <Route path="/table" element={<DateRange settingDate={setting} />} />
                  </Routes>
                </div>
                <div>
                  <Routes>
                    <Route path="/table" element={<Table datesBetween={datesBetween} />} />
                  </Routes>
                </div>
              </>
            )}
          </div>
          <Outlet />
        </div>
      ) : (
        <div className="container1">
          <div className="Default">
            <div className="entrySidebar">
              <div className="sidebar1">
                {admin && <UserList onSelectUser={handleUserSelect} />}
                <ul>
                  <li className={activeItem === 'milk' ? 'active' : ''}>
                    <a onClick={() => handleNavigation('/entries/milk-entry', 'milk')}>Enter Milk</a>
                  </li>
                  <li className={activeItem === 'ghee' ? 'active' : ''}>
                    <a onClick={() => handleNavigation('/entries/ghee-entry', 'ghee')}>Ghee Entry</a>
                  </li>
                  <li className={activeItem === 'feed' ? 'active' : ''}>
                    <a onClick={() => handleNavigation('/entries/feed-entry', 'feed')}>Feed Entry</a>
                  </li>
                  <li className={activeItem === 'give-money' ? 'active' : ''}>
                    <a onClick={() => handleNavigation('/entries/give-money', 'give-money')}>Give Money</a>
                  </li>
                  <li className={activeItem === 'receive-money' ? 'active' : ''}>
                    <a onClick={() => handleNavigation('/entries/receive-money', 'receive-money')}>Receive Money</a>
                  </li>
                  <li className={activeItem === 'cow-fat' ? 'active' : ''}>
                    <a onClick={() => handleNavigation('/entries/cow/prices', 'cow-fat')}>Cow Fat Chart</a>
                  </li>
                  <li className={activeItem === 'cow-snf' ? 'active' : ''}>
                    <a onClick={() => handleNavigation('/entries/cow/prices/snf', 'cow-snf')}>Cow Fat and SNF Chart</a>
                  </li>
                  <li className={activeItem === 'buffalo-fat' ? 'active' : ''}>
                    <a onClick={() => handleNavigation('/entries/buffalo/prices', 'buffalo-fat')}>Buffalo Fat Chart</a>
                  </li>
                  <li className={activeItem === 'buffalo-snf' ? 'active' : ''}>
                    <a onClick={() => handleNavigation('/entries/buffalo/prices/snf', 'buffalo-snf')}>Buffalo Fat and SNF Chart</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="form2">
              <Routes>
                <Route path="*" element={<DefaultMilk userId={userId} smallScreen={isSmallScreen} />} />
                <Route path="/others" element={<DefaultEntry userId={userId} />} />
                <Route path="/ghee-entry" element={<DefaultEntry userId={userId} userSelectedOption="Ghee" />} />
                <Route path="/receive-money" element={<DefaultEntry userId={userId} userSelectedOption="Receive Money" />} />
                <Route path="/give-money" element={<DefaultEntry userId={userId} userSelectedOption="Give Money" />} />
                <Route path="/feed-entry" element={<DefaultEntry userId={userId} userSelectedOption="Feed" />} />
                <Route path="/buffalo/prices" element={<FatPrices tableTitle="buffalo" />} />
                <Route path="/cow/prices" element={<FatPrices tableTitle="Cow" />} />
                <Route path="/buffalo/prices/snf" element={<BuffaloPriceEntryGrid tableTitle="buffalo-snf" />} />
                <Route path="/cow/prices/snf" element={<CowPriceEntryGrid tableTitle="cow-snf" />} />
              </Routes>
            </div>
          </div>
          <Outlet />
        </div>
      )}
    </>
  );
}

export default Entry;
