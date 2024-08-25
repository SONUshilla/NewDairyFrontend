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
            {admin && <UserList onSelectUser={handleUserSelect} />}
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
          <div className='ProfileUser'>
    <div className='ProfileFront'>
    <div className='ProfileImageContainer'>
    <img className='profileImage' src={poster}></img>
    </div>
      <div className='ProfileInfo'>
        <h2>Sonu</h2>
        <p>sonushilla189@gmail.com</p>
      </div>
</div>
      <div>
      <h3> Available Balance : 5000</h3>
      </div>
    </div>
          <div className="table-container">
            {active === 'Stats' && <TotalBalance startDate={startDate} endDate={endDate} userId={userId}  AssociateUser={AssociateUser}/>}
            {active === 'entry' && <BalanceSheet startDate={startDate} endDate={endDate} userId={userId} option={option} AssociateUser={AssociateUser} />}
          </div>
        </div>
      ) : (
        <div className="balance-table-container">
        <div style={{backgroundColor:"#ecf0f1", padding:"10px", borderRadius:"5px"}}>
          <div className="user-select">
            {admin && <UserList onSelectUser={handleUserSelect} component={"balance"} />}
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
          
          <div className='ProfileUser'>
    <div className='ProfileFront'>
    <div className='ProfileImageContainer'>
    <img className='profileImage' src={poster}></img>
    </div>
      <div className='ProfileInfo'>
        <h2>Sonu</h2>
        <p>sonushilla189@gmail.com</p>
      </div>
</div>
      <div>
      <h3> Available Balance : 5000</h3>
      </div>
    </div>
          <div className="table-container">
          <div>
          <h1>Balance</h1>
            <TotalBalance startDate={startDate} endDate={endDate} userId={userId} />
            </div>
            <div>
            <h1>Entry</h1>
            <BalanceSheet startDate={startDate} endDate={endDate} userId={userId} option={option} />
            </div>
          </div>
        </div>
        </div>
      )}
    </>
  );
};

export default Balance;
