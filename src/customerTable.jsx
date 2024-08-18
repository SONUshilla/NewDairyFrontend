import {useState,React,useEffect }from "react";
import axios from "axios";
import { baseURL } from "./config";
import setUpAxios from "./setUpAxios";

function CustomerTable(){
    const [customers, setCustomers] = useState([]);
    setUpAxios();
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

    return (<>
    
        <div className="customer-table">
        <h3 className="table-heading">Customer Table</h3>
            <ul className="icon-list">
                {customers.map((customer, index) => (
                    <li key={customer.id}>
                        <span className="user-icon">{customer.name.charAt(0)}</span>
                        <span className="name">{customer.name}</span>
                        <span className="name">+4000</span>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
}

export default CustomerTable;