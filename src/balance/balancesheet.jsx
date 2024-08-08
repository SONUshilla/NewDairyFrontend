import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { baseURL } from '../config'; // Adjust the import path as necessary
import setUpAxios from "../setUpAxios";
function BalanceSheet({ startDate, endDate, userId }) {
    const [balanceData, setBalanceData] = useState({ morning: {}, evening: {}, borrow: [] });
    useEffect(() => {
        // Fetch balance sheet data when component mounts or when startDate/endDate change
        fetchBalanceSheet();
    }, [startDate, endDate, userId]); // Include userId in the dependency array

    const fetchBalanceSheet = async () => {
        
        try {
           
            let response;
            if (userId) {
                setUpAxios();
                // If userId is present, send userId with the request to '/admin/balanceSheet'
                response = await axios.post(`${baseURL}/admin/balanceSheet`, { startDate, endDate, userId });
            } else {
               setUpAxios();
                // Otherwise, send request to '/balanceSheet' (default endpoint)
                response = await axios.post(`${baseURL}/balanceSheet`, { startDate, endDate });
            }

            if (response.status === 200) {
                // Update state with fetched data
                console.log(response.data);
                setBalanceData(response.data);
            } else {
                throw new Error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching balance sheet data:", error);
        }
    };

    return (
        <div>
            <span><h1>Balance Sheet</h1></span>
            <table className="balance-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Money</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={"morning"} className="MorningData">
                        <td>----</td>
                        <td>Milk</td>
                        <td>{balanceData.morning && (<p>{balanceData.morning.totalmilk ? balanceData.morning.totalmilk : 0}</p>)}</td>
                        <td>----</td>
                        <td>{balanceData.morning && (<p>{balanceData.morning.total ? balanceData.morning.total : 0}</p>)}</td>
                    </tr>
                    <tr key={"morning"} className="MorningData">
                        <td>----</td>
                        <td>Milk</td>
                        <td>{balanceData.evening && (<p>{balanceData.evening.totalmilk ? balanceData.evening.totalmilk : 0}</p>)}</td>
                        <td>----</td>
                        <td>{balanceData.evening && (<p>{balanceData.evening.total ? balanceData.evening.total : 0}</p>)}</td>
                    </tr>
                    {balanceData.borrow.map((item, index) => (
                        <tr key={index} className="MorningData">
                            <td>{item.date}</td>
                            <td>{item.item}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{item.money}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BalanceSheet;
