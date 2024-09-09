import React, { useState, useEffect } from "react";
import "./FatPrices.css"; // Import CSS file for styling

function FatPrices({ tableTitle }) {
    // Initializing the state based on the type of table (cow vs others)
    const initialFatPrices = (() => {
        const storedFatPrices = localStorage.getItem(`${tableTitle}_fatPrices`);
        if (storedFatPrices) {
            return JSON.parse(storedFatPrices);
        } else {
            if (tableTitle === "Cow") {
                return {
                    below35: "",
                    above35: ""
                };
            } else {
                return {
                    fat100: ""
                };
            }
        }
    })();

    const [fatPrices, setFatPrices] = useState(initialFatPrices);

    useEffect(() => {
        localStorage.setItem(`${tableTitle}_fatPrices`, JSON.stringify(fatPrices));
    }, [fatPrices]);

    // Handle input change for cow (below and above 3.5%)
    const handleCowPriceChange = (key, value) => {
        setFatPrices((prevPrices) => ({
            ...prevPrices,
            [key]: value
        }));
    };

    // Handle input change for other animals (single input for 100% fat)
    const handleOtherPriceChange = (value) => {
        setFatPrices((prevPrices) => ({
            ...prevPrices,
            fat100: value
        }));
    };

    return (
        <div className="fat-prices-container">
            <h2>{tableTitle === "Cow" ? "Cow Fat Prices" : "Buffalo Fat Prices"}</h2>

            {tableTitle === "Cow" ? (
                // Cow-specific inputs for below and above 3.5%
                <div className="cow-prices">
                    <div>
                        <label>Price for fat below 3.5%:</label>
                        <input
                            type="number"
                            value={fatPrices.below35}
                            onChange={(e) => handleCowPriceChange("below35", e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Price for fat above 3.5%:</label>
                        <input
                            type="number"
                            value={fatPrices.above35}
                            onChange={(e) => handleCowPriceChange("above35", e.target.value)}
                        />
                    </div>
                </div>
            ) : (
                // Other animals input for 100% fat
                <div className="other-prices">
                    <label>Price for 100% fat:</label>
                    <input
                        type="number"
                        value={fatPrices.fat100}
                        onChange={(e) => handleOtherPriceChange(e.target.value)}
                    />
                </div>
            )}
        </div>
    );
}

export default FatPrices;
