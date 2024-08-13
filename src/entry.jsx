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
  const [active, setActive] = useState('milk'); // Default active is 'milk'
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 850);

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
  
  return (<>
    {isSmallScreen? 
    <div className="container1">

       <div className="toggleBar">
      <p 
        className={active === 'milk' ? 'active' : ''}
        onClick={() => setActive('milk')}
      >
        milk entries
      </p>
      <p 
        className={active === 'others' ? 'active' : ''} 
        onClick={() => setActive('others')}
      >
        others
      </p>
    </div>
      <div className="userlist1">
        <Routes>
          <Route path="/" element={admin && <UserList onSelectUser={handleUserSelect} />} />
        </Routes>
     
        </div>
      <div className="Default">
   <div className="form2">

    {active === 'milk' ?  <h1 >Milk Entries</h1>:""}
   {active === 'milk' && (
  
        <Routes>
          <Route path="/" element={<DefaultMilk userId={userId} />} />
        </Routes>
      )}
      </div>
      <div className="form2">
      {active === 'others'?  <h1 >Others</h1>:""}
      {active === 'others' && (
        <Routes>
          <Route path="/" element={<DefaultEntry userId={userId} />} />
        </Routes>
      )}</div>
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
      <Outlet/>
    </div> :    
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
      <div className="form2">
      <h1>Milk Entries</h1>
      <Routes>
        <Route path="/" element={<DefaultMilk userId={userId} />} />
      </Routes>
      </div>
      <div className="form2">
      <h1>Others</h1>
      <Routes>
        <Route path="/" element={<DefaultEntry userId={userId} />} />
      </Routes></div>
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
      <Outlet/>
    </div>
  }</>
  );
}

export default Entry;
