import React, { useState } from "react";
import moment from "moment";
function DefaultEntry() {
    const [selectedOption, setSelectedOption] = useState("Feed");

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
        formData.date=moment(event.target.elements.date.value).format('YYYY-MM-DD');
        let endpoint;
        if (selectedOption === "Money") {
            endpoint = "/addMoney";
        } else if (selectedOption === "Money Return") {
            endpoint = "/receiveMoney";
        } else {
            endpoint = "/items";
        }

        try {
            // Send POST request to the determined endpoint
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to send request");
            }

            // Handle response if needed
            const responseData = await response.json();
            console.log("Response data:", responseData);
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    return (
        <div className="DefaultEntry">
        <h1>Entry</h1>
            <form onSubmit={handleSubmit}>
            <input type="date" name="date" required></input>
                <select value={selectedOption} onChange={handleChange}>
                    <option value="Money">Money</option>
                    <option value="Feed">Feed</option>
                    <option value="Ghee">Ghee</option>
                    <option value="Money Return">Money Return</option>
                </select>
                {selectedOption === "Money" || selectedOption === "Money Return" ? (
                    <input type="number" name="moneyAmount" placeholder="Enter money" />
                ) : (
                    <>
                        <input type="number" name="quantity" placeholder="Enter quantity" required/>
                        <input type="number" name="price" placeholder="Enter price"  required />
                    </>
                )}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default DefaultEntry;
