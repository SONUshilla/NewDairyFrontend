import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from './config';
import setUpAxios from './setUpAxios';

const StockTable = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        setUpAxios(); // Call to set up axios if needed
        const startDate = '2024-08-01';
        const endDate = '2024-08-31';
        const response = await axios.post(`${baseURL}/admin/stockCheck`, { startDate, endDate });
        setStockData(response.data);
        console.log(response);
      } catch (error) {
        setError("Error fetching data: " + error.message);
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Stock Summary</h2>
      <table className='balance-table'>
        <thead>
          <tr>
            <th>Item</th>
            <th>Available</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Feed</td>
            <td>{stockData.feedStockAvailable}</td>
            <td>{stockData.feedQuantitySold}</td>
          </tr>
          <tr>
            <td>Ghee</td>
            <td>{stockData.gheeStockAvailable}</td>
            <td>{stockData.gheeQuantitySold}</td>
          </tr>
          <tr>
            <td>Money Available</td>
            <td colSpan="2">{stockData.moneyAvailable}</td>
          </tr>
          <tr>
            <td>Money Given</td>
            <td colSpan="2">{stockData.moneyGiven}</td>
          </tr>
          <tr>
            <td>Receive Money Available</td>
            <td colSpan="2">{stockData.receiveMoneyAvailable}</td>
          </tr>
          <tr>
            <td>Money Received</td>
            <td colSpan="2">{stockData.moneyReceived}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
