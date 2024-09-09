import React, { useState, useEffect } from 'react';
import DateSelector1 from './DateSelector1';
import TotalBalance from './balance/totalbalance';
import BalanceSheet from './balance/balancesheet';
import moment from 'moment';
import UserList from './usersList';
import axios from 'axios';
import setUpAxios from './setUpAxios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { baseURL } from './config'; // Adjust the import path as necessary
import poster from "./images/dairy-home.jpg";
import UserProfile from './userprofile';
import { BrowserRouter as Router, Route, Routes, Link, Outlet ,useNavigate,useLocation} from "react-router-dom";

const Balance = () => {
  const [active, setActive] = useState('Stats'); // Default active is 'Stats'
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 850);
  const [startDate, setStartDate] = useState(moment().startOf('year').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));
  const [userId, setUserId] = useState('');
  const [admin, setAdmin] = useState(false);
  const [option ,setOption]=useState("Customers");
  const [user,setUser]=useState(false);
  const [AssociateUser,setAssociateUser]=useState(false);
  const [profile,setprofile]=useState("");
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [total, setTotal] = useState(0);

  const location = useLocation(); // Get location object from react-router-dom
  const navigate=useNavigate();
  useEffect(() => {
    // Extract state from location
    const { state } = location;
    if (state) {
      const { username, name, total } = state;
      setUsername(username || '');
      setName(name || '');
      setTotal(total || 0);
    }
  }, [location]);

  const handleUserDataFetched = (data) => {
    setprofile(data);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 850);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    // Fetching data from the API
    const fetchData = async () => {
        try {
          const response = await axios.post(`${baseURL}/singleUser`, {userId});
            setName(response.data[0].name);
            setUsername(response.data[0].username);
            setTotal(response.data[0].total);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, [userId]);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const response = await axios.get(`${baseURL}/adminAuth`);
        if (response.status === 200) {
          setAdmin(true);
          localStorage.removeItem("user");
        } else if (response.status === 205) {
          setUser(true);
        } else {
          setAdmin(false);
          setAssociateUser(true);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setAdmin(false);
      }
    };

    fetchAdminStatus();
  }, []);

  const handleDateRangeSelection = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleUserSelect = (selectedUserId) => {
    setUserId(selectedUserId);
  };

  return (
    <>
<UserProfile onUserDataFetched={handleUserDataFetched} />
      {isSmallScreen ? (
        <div className="balance-table-container">
          <div className="toggleBar">
            <p 
              className={active === 'Stats' ? 'active' : ''}
              onClick={() => setActive('Stats')}
            >
              Milk Entries
            </p>
            <p 
              className={active === 'entry' ? 'active' : ''} 
              onClick={() => setActive('entry')}
            >
              Others
            </p>
          </div>
          <div className="user-select">
            {admin && <div>       
              <UserList onSelectUser={handleUserSelect} />
            <div className='ProfileUser'>
    <div className='ProfileFront'>
    {profile.image ? <div className='ProfileImageContainer'>
    <img className='profileImage' src={profile.image}></img>
    </div> : <span className="user-icon">{name.charAt(0)}</span>}
      <div className='ProfileInfo'>
        <h2>{name}</h2>
        <p>{username}</p>
      </div>
</div>
      <div>
      <h3> {total}</h3>
      </div>
    </div></div>}
            <DateSelector1 onSelectDateRange={handleDateRangeSelection} />
            <button
              style={{
                color: 'black',
                backgroundColor: 'white',
                border: '1px solid black',
                padding: '8px'
              }}
              onClick={() => window.print()}
            >
              <FontAwesomeIcon icon={faPrint} /> Print
            </button>
          </div>
   
          <div className="table-container">
            {active === 'Stats' && <TotalBalance startDate={startDate} endDate={endDate} userId={userId}  AssociateUser={AssociateUser}/>}
            {active === 'entry' && <BalanceSheet startDate={startDate} endDate={endDate} userId={userId} option={option} AssociateUser={AssociateUser} />}
          </div>
        </div>
      ) : (
        <div className="Default">
        <div className="entrySidebar">
      <div class="sidebar1">
            {admin && <UserList onSelectUser={handleUserSelect}/>}
            <ul>
                <li><a onClick={()=>{navigate("/balance/all")}}>Balance Table</a></li>
                <li><a onClick={()=>{navigate("/balance/balanceSheet")}}>Entry Table</a></li>
            </ul>
        </div></div>
        <div>
          
          <div className="table-container">
          <Routes>
          <Route path="*" element={<TotalBalance startDate={startDate} endDate={endDate} userId={userId} />} />
          <Route path="/balanceSheet" element={<BalanceSheet startDate={startDate} endDate={endDate} userId={userId} option={option} />} />
          </Routes>
          </div>
        </div>
        </div>
      )}
    </>
  );
};

export default Balance;
