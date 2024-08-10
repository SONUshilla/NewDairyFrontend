import React, { useState ,useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from "react-router-dom";
import DateRange from "./dates";
import Table from "./Table";
import DefaultEntry from "./DefaultEntry";
import DefaultMilk from "./DefaultMilk";
import UserList from "./usersList";
import axios from "axios";
import { baseURL } from './config'; // Adjust the import path as necessary
function Entry() {
  const [datesBetween, setDatesBetween] = React.useState([]);
  const [DateSelect, setDateSelect] = useState(false);
  const [text,setText]=useState("Multiple");
  const [path,setPath]=useState("table");
  const [userId, setUserId] = useState(""); // State to store the selected user ID
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const response = await axios.get(`${baseURL}/adminAuth`);
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
    <div className="container1">
      <div className="userlist1">
        <Routes>
          <Route path="/" element={admin && <UserList onSelectUser={handleUserSelect} />} />
        </Routes>
        <div className="handleEntry">
        <Link to={path} onClick={handleToggleDateSelect}>{text}</Link>
      </div>
        </div>
      <div className="Default">
      <Routes>
        <Route path="/" element={<DefaultMilk userId={userId} />} />
      </Routes>
      <Routes>
        <Route path="/" element={<DefaultEntry userId={userId} />} />
      </Routes></div>
      
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
      <Outlet/>
    </div>
  );
}

export default Entry;
