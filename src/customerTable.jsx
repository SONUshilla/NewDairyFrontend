import {React,useState,useEffect }from "react";
import { Routes,Route ,Link, Navigate,useNavigate} from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'; // Import the add user icon
import { baseURL } from './config'; // Adjust the import path as necessary
import setUpAxios from "./setUpAxios";

function CustomerTable(){
    const [customers, setCustomers] = useState([]);
    const [admin, setAdmin] = useState(false);
    setUpAxios();
    const navigate=useNavigate();
    useEffect(() => {
        // Fetching data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/users`);
                console.log(response.data); // Check the data structure in the console
                setCustomers(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        const fetchAdminStatus = async () => {
          try {
            setUpAxios();
            const response = await axios.get(`${baseURL}/adminAuth`);
            if (response.status === 200) {
              setAdmin(true);
            }else if(response.status === 205){
              setUser(true);
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
    return (<>
    
        <div className="customer-table">
        <div style={{display:"flex",justifyContent:"space-between",borderBottom:"1px solid black"}}>    <h3 className="table-heading">Customer Table</h3>
        {admin && <Link className="addUser" to="/addUser">
        <FontAwesomeIcon icon={faUserPlus} /> </Link>}</div>
     
            <ul className="icon-list">
                {customers.map((customer, index) => (
                  <li 
                      key={customer.id} 
                      onMouseDown={() => {
                          navigate("/balance", { state: { 
                              username: customer.username, 
                              name: customer.name, 
                              total: customer.total
                          }});
                      }}
                    >
                        <span className="user-icon">{customer.name.charAt(0)}</span>
                        <span className="name">{customer.name}</span>
                        <span className="name">{customer.total}</span>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
}

export default CustomerTable;