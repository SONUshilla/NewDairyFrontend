import React, { useState, useEffect, useRef } from 'react';
import "./grid.css";

const CowPriceEntryGrid = ({ calculatePrice, tableTitle }) => {
  const numRows = 10;
  const numCols = 10;
  const [title, setTitle] = useState("");

  // Initialize prices from localStorage or default to 0
  const [prices, setPrices] = useState(() => {
    const storedPrices = localStorage.getItem(tableTitle);
    return storedPrices
      ? JSON.parse(storedPrices)
      : Array.from({ length: numRows }, () => Array.from({ length: numCols }, () => 0));
  });

  // Set the title based on the tableTitle prop
  useEffect(() => {
    if (tableTitle === "cow-snf") {
      setTitle("Cow");
    } else {
      setTitle("Buffalo");
    }

    // Update prices when the tableTitle changes
    const storedPrices = localStorage.getItem(tableTitle);
    if (storedPrices) {
      setPrices(JSON.parse(storedPrices));
    } else {
      setPrices(Array.from({ length: numRows }, () => Array.from({ length: numCols }, () => 0)));
    }
  }, [tableTitle]);

  // Store prices in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(tableTitle, JSON.stringify(prices));
  }, [prices, tableTitle]);

  // Create refs for each input
  const inputRefs = useRef(
    Array.from({ length: numRows }, () => Array(numCols).fill(null))
  );

  const handlePriceChange = (x, y, event) => {
    const newPrices = [...prices];
    newPrices[y][x] = parseFloat(event.target.value) || 0;
    setPrices(newPrices);
  };

  const focusNextInput = (currentIndex, rowIndex) => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < numCols) {
      inputRefs.current[rowIndex][nextIndex].focus();
    }
  };

  const handleKeyDown = (e, x, y) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      focusNextInput(x, y);
    }
  };

  return (
    <div className='MainGrid'>
      <h2>{title} Price Entry Grid</h2>
      <table className='CowPriceEntryGrid'>
        <thead>
          <tr>
            <th></th>
            {Array.from({ length: numCols }, (_, index) => (
              <th key={index}>Fat {index + 1}%</th>
            ))}
          </tr>
        </thead>
        <tbody className='CowEntryInputs'>
          {Array.from({ length: numRows }, (_, y) => (
            <tr key={y}>
              <td style={{fontWeight:"bold"}}>SNF {y + 1}%</td>
              {Array.from({ length: numCols }, (_, x) => (
                <td key={x}>
                  <input
                    type="number"
                    value={prices[y][x]}
                    onChange={(event) => handlePriceChange(x, y, event)}
                    onKeyDown={(e) => handleKeyDown(e, x, y)}
                    ref={(el) => { inputRefs.current[y][x] = el; }}
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
