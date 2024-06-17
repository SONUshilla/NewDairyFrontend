import React, { useState, useEffect } from 'react';
import "./grid.css";

const CowPriceEntryGrid = ({ calculatePrice }) => {
  const [prices, setPrices] = useState(() => {
    // Initialize prices from localStorage or default to 0
    const storedPrices = localStorage.getItem('cowChartData');
    return storedPrices ? JSON.parse(storedPrices) : Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => 0));
  });

  useEffect(() => {
    // Store prices in localStorage whenever it changes
    localStorage.setItem('cowChartData', JSON.stringify(prices));
  }, [prices]);

  const handlePriceChange = (x, y, event) => {
    const newPrices = [...prices];
    newPrices[y][x] = parseFloat(event.target.value) || 0; // Ensure the value is a number or default to 0
    setPrices(newPrices);
  };

  return (
    <div>
      <h2>Cow Price Entry Grid</h2>
      <table className='CowPriceEntryGrid'>
        <thead>
          <tr>
            <th></th>
            {Array.from({ length: 10 }, (_, index) => (
              <th key={index}>Fat {index + 1}%</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }, (_, y) => (
            <tr key={y}>
              <td>SNF {y + 1}%</td>
              {Array.from({ length: 10 }, (_, x) => (
                <td key={x}>
                  <input
                    type="number"
                    value={prices[y][x]}
                    onChange={(event) => handlePriceChange(x, y, event)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CowPriceEntryGrid;
