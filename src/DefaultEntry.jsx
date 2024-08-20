import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import setUpAxios from "./setUpAxios";

function DefaultEntry() {
    const [selectedOption, setSelectedOption] = useState("Feed");
    const [date, setDate] = useState('');

    // Set today's date when the component mounts
    useEffect(() => {
        const todayDate = new Date().toISOString().split('T')[0];
        setDate(todayDate);
    }, []);

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let formData = {}; // Define formData variable

        // Handle form submission based on the selected option
        if (selectedOption === "Money" || selectedOption === "Money Return") {
            formData.moneyAmount = event.target.elements.moneyAmount.value;
        } else {
            formData.quantity = event.target.elements.quantity.value;
            formData.price = event.target.elements.price.value;
        }
        formData.selectedOption = selectedOption;
        formData.date = date;

        let endpoint;
        if (selectedOption === "Money") {
            endpoint = "/addMoney";
        } else if (selectedOption === "Money Return") {
            endpoint = "/receiveMoney";
        } else {
            endpoint = "/items";
        }

        try {
            // Send POST request using axios
            setUpAxios();
            const response = await axios.post(endpoint, formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            // Handle response if needed
            console.log("Response data:", response.data);
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    return (
        <div className="DefaultEntry form">
            <form onSubmit={handleSubmit}>
                <input
                    style={{
                        border: "2px solid black",
                        color: "black",
                        fontWeight: "bold",
                        fontFamily: "'Truculenta', sans-serif"
                    }}
                    type="date"
                    name="date"
                    value={date}
                    onChange={handleDateChange}
                    required
                />
                <select
                    style={{
                        border: "2px solid black",
                        color: "black",
                        fontWeight: "bold",
                        fontFamily: "'Truculenta', sans-serif"
                    }}
                    value={selectedOption}
                    onChange={handleChange}
                >
                    <option value="Money">Money</option>
                    <option value="Feed">Feed</option>
                    <option value="Ghee">Ghee</option>
                    <option value="Money Return">Money Return</option>
                </select>
                {selectedOption === "Money" || selectedOption === "Money Return" ? (
                    <input
                        type="number"
                        name="moneyAmount"
                        placeholder="Enter money"
                    />
                ) : (
                    <>
                        <input
                            style={{
                                border: "2px solid black",
                                color: "black",
                                fontWeight: "bold",
                                fontFamily: "'Truculenta', sans-serif"
                            }}
                            type="number"
                            name="quantity"
                            placeholder="Enter quantity"
                            required
                        />
                        <input
                            style={{
                                border: "2px solid black",
                                color: "black",
                                fontWeight: "bold",
                                fontFamily: "'Truculenta', sans-serif"
                            }}
                            type="number"
                            name="price"
                            placeholder="Enter price"
                            required
                        />
                    </>
                )}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default DefaultEntry;
