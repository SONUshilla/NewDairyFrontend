import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from './config';
import setUpAxios from './setUpAxios';
import './stockTable.css';

const StockTable = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        setUpAxios();
        const startDate = '2024-08-01';
        const endDate = '2024-08-31';
        const response = await axios.post(`${baseURL}/admin/stockCheck`, { startDate, endDate });
        setStockData(response.data);
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
    <div className='stock-container'>
      <div className='table-heading'><h2 style={{padding:"9px"}}>Stock Summary</h2></div>
      <div className='stock-grid'>
        <div className='stock-item'>
          <h3>Feed</h3>
          <p>Available: {stockData.feedStockAvailable}</p>
          <p>Sold: {stockData.feedQuantitySold}</p>
        </div>
        <div className='stock-item'>
          <h3>Ghee</h3>
          <p>Available: {stockData.gheeStockAvailable}</p>
          <p>Sold: {stockData.gheeQuantitySold}</p>
        </div>
        <div className='stock-item'>
          <h3>Money Available</h3>
          <p>{stockData.moneyAvailable}</p>
        </div>
        <div className='stock-item'>
          <h3>Money Given</h3>
          <p>{stockData.moneyGiven}</p>
        </div>
        <div className='stock-item'>
          <h3>Receive Money Available</h3>
          <p>{stockData.receiveMoneyAvailable}</p>
        </div>
        <div className='stock-item'>
          <h3>Money Received</h3>
          <p>{stockData.moneyReceived}</p>
        </div>
      </div>
    </div>
  );
};

export default StockTable;
