import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from './config';
import setUpAxios from './setUpAxios';
import "./stockTable.css";

const StockTable = () => {
  const [stockData, setStockData] = useState({});
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
    <div className='stock-summary'>
      <div className='table-heading stock-table-heading'><h2>Stock Summary</h2></div>
      <ul className='stock-list'>
        {/* Feed */}
        <li className='stock-item'>
          <h3>Feed</h3>
          <ul className='sub-list'>
            <li>
              <span>Available:</span> {stockData.feedStockAvailable}
            </li>
            <li>
              <span>Sold:</span> {stockData.feedQuantitySold}
            </li>
          </ul>
        </li>

        {/* Ghee */}
        <li className='stock-item'>
          <h3>Ghee</h3>
          <ul className='sub-list'>
            <li>
              <span>Available:</span> <p>{stockData.gheeStockAvailable}</p>
            </li>
            <li>
              <span>Sold:</span> <p>{stockData.gheeQuantitySold}</p>
            </li>
          </ul>
        </li>

        {/* Money Available & Given */}
        <li className='stock-item'>
          <h3>Money Received</h3>
          <ul className='sub-list'>
            <li>
              <span>Available:</span> {stockData.moneyAvailable}
            </li>
            <li>
              <span>Given:</span> {stockData.moneyGiven}
            </li>
          </ul>
        </li>

        {/* Receive Money Available & Received */}
        <li className='stock-item'>
          <h3>Money</h3>
          <ul className='sub-list'>
            <li>
              <span>Available:</span> {stockData.receiveMoneyAvailable}
            </li>
            <li>
              <span>Received:</span> {stockData.moneyReceived}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default StockTable;
