import React, { useState, useEffect } from "react";
import "./grid.css"; // Import CSS file for styling

function FatPrices({ tableTitle }) {
    const initialFatPrices = (() => {
        const storedFatPrices = localStorage.getItem(`${tableTitle}_fatPrices`); // Using table title in local storage key
        if (storedFatPrices) {
            return JSON.parse(storedFatPrices);
        } else {
            const initialArray = [];
            for (let i = 10; i <= 100; i++) {
                initialArray.push({
                    value: i / 10,
                    inputValue: ""
                });
            }
            return initialArray;
        }
    })();

    const [fatPrices, setFatPrices] = useState(initialFatPrices);

    useEffect(() => {
        localStorage.setItem(`${tableTitle}_fatPrices`, JSON.stringify(fatPrices)); // Using table title in local storage key
    }, [fatPrices]);

    const handleInputChange = (index, event) => {
        const { value } = event.target;
        const newFatPrices = [...fatPrices];
        newFatPrices[index].inputValue = value;
        setFatPrices(newFatPrices);
    };

    return (
        <div className="fat-prices-container">
            <h2>{tableTitle}</h2> {/* Displaying table title */}
            <div className="grid-container">
                {fatPrices.map((item, index) => (
                    <div key={index} className="grid-item">
                        <label>{item.value.toFixed(1)}</label>
                        <input
                            type="text"
                            value={item.inputValue}
                            onChange={(event) => handleInputChange(index, event)}
                            className="input-field small-square-input" // Apply small square input styling
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FatPrices;
