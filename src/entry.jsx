import React, { useState ,useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, Link, Outlet ,useNavigate} from "react-router-dom";
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
  const [datesBetween, setDatesBetween] = React.useState([]);
  const [DateSelect, setDateSelect] = useState(false);
  const [text,setText]=useState("Multiple");
  const [path,setPath]=useState("table");
  const [userId, setUserId] = useState(""); // State to store the selected user ID
  const [admin, setAdmin] = useState(false);
  const [active, setActive] = useState('milk'); // Default active is 'milk'
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 850);
const navigate=useNavigate();
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
      {admin && <UserList onSelectUser={handleUserSelect} /> }

     
        </div>
      <div className="DefaultSmall">
   <div className="form2">

   
   {active === 'milk' && (
  
        <Routes>
          <Route path="/" element={<DefaultMilk userId={userId} smallScreen={isSmallScreen}/>} />
        </Routes>
      )}
      </div>
      <div className="form2">
      {active === 'others'? <div className="table-heading">  <h1>Milk Entries</h1></div>:""}
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
      <div className="Default">
      <div className="entrySidebar">
      <div class="sidebar1">
            {admin && <UserList onSelectUser={handleUserSelect}/>}
            <ul>
                <li><a onClick={()=>{navigate("/entries/milk-entry")}}>Enter Milk</a></li>
                <li><a onClick={()=>{navigate("/entries/ghee-entry")}}>Ghee Entry</a></li>
                <li><a onClick={()=>{navigate("/entries/feed-entry")}}>Feed Entry</a></li>
                <li><a onClick={()=>{navigate("/entries/give-money")}}>Receive Money</a></li>
                <li><a onClick={()=>{navigate("/entries/receive-money")}}>Give Money</a></li>
                <li><a onClick={()=>{navigate("/entries/cow/prices")}}>Cow Fat Chart</a></li>
                <li><a onClick={()=>{navigate("/entries/cow/prices/snf")}}>Cow Fat and SNF Chart</a></li>
                <li><a onClick={()=>{navigate("/entries/buffalo/prices")}}>Buffalo Fat Chart</a></li>
                <li><a onClick={()=>{navigate("/entries/buffalo/prices/snf")}}>Buffalo Fat and SNF Chart</a></li>
            </ul>
        </div></div>
      <div className="form2">
    
    
      <Routes>
        <Route path="*" element={<DefaultMilk userId={userId} smallScreen={isSmallScreen} />} />
          <Route path="/others" element={<DefaultEntry userId={userId} />} />
          <Route path="/ghee-entry" element={<DefaultEntry userId={userId} userSelectedOption="Ghee"/>} />
          <Route path="/receive-money" element={<DefaultEntry userId={userId} userSelectedOption="Receive Money"/>} />
          <Route path="/give-money" element={<DefaultEntry userId={userId} userSelectedOption="Give Money"/>} />
          <Route path="/feed-entry" element={<DefaultEntry userId={userId} userSelectedOption="Feed"/>} />
          <Route path="/buffalo/prices" element={<FatPrices tableTitle={"buffalo"} />} />
          <Route path="/cow/prices" element={<FatPrices tableTitle={"Cow"} />} />
          <Route path="/buffalo/prices/snf" element={ <CowPriceEntryGrid tableTitle={"buffalo-snf"}/>}/>
          <Route path="/cow/prices/snf" element={<CowPriceEntryGrid tableTitle={"cow-snf"}/>} />
      </Routes>
     
      
  </div>
      </div>
      

      <Outlet/>
    </div>
  }</>
  );
}

export default Entry;
