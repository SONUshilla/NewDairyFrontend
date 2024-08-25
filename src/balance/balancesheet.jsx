import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { baseURL } from '../config'; // Adjust the import path as necessary
import setUpAxios from "../setUpAxios";
import Spinner from "../Spinner";
function BalanceSheet({ startDate, endDate, userId,AssociateUser }) {
    const [loading, setLoading] = useState(false);
    const [balanceData, setBalanceData] = useState({ morning: {}, evening: {}, borrow: [] });
    useEffect(() => {
        // Fetch balance sheet data when component mounts or when startDate/endDate change
        fetchBalanceSheet();
    }, [startDate, endDate, userId]); // Include userId in the dependency array

    const fetchBalanceSheet = async () => {
        setLoading(true);
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
        finally {
            setLoading(false);
          }
    };
    if (loading) {
        return <div><Spinner></Spinner></div>;
      }
    return (
        <div className="container1">
            <table className="balance-table">
                <thead>
                    <tr> 
                        <th>Item</th>
                        <th style={{ textAlign: 'center' }}>Date</th>
                        <th style={{ textAlign: 'center' }}>Quantity</th>
                        <th>Money</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={"morning"} className="MorningData">
                        <td>Milk</td>
                        <td></td>
                        <td style={{ textAlign: 'center' }}>{balanceData.morning && (<p>{balanceData.morning.totalmilk ? balanceData.morning.totalmilk : 0}</p>)}</td>
                        <td>{balanceData.morning && (<p>{balanceData.morning.total ? balanceData.morning.total : 0}</p>)}</td>
                    </tr>
                    <tr key={"evening"} className="MorningData">
                        <td>Milk</td>
                        <td></td>
                        <td style={{ textAlign: 'center' }}>{balanceData.evening && (<p>{balanceData.evening.totalmilk ? balanceData.evening.totalmilk : 0}</p>)}</td>
                        <td>{balanceData.evening && (<p>{balanceData.evening.total ? balanceData.evening.total : 0}</p>)}</td>
                    </tr>
                    {balanceData.borrow.map((item, index) => (
                        <tr key={index} className="MorningData">
                            <td>{item.item}{item.name}</td>
                            <td style={{ textAlign: 'center' }}>{item.date}</td>
                            <td style={{ textAlign: 'center' }}>{item.quantity}×{item.price}</td>
                            <td>{item.money}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BalanceSheet;
