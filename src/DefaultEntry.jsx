import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import setUpAxios from "./setUpAxios";
import { toast,Bounce } from "react-toastify";
function DefaultEntry({ userId ,userSelectedOption}) {
    const [selectedOption, setSelectedOption] = useState("Feed");
    const [date, setDate] = useState('');
useEffect(()=>{
    if(userSelectedOption){
    setSelectedOption(userSelectedOption);
    }
},[userSelectedOption]);
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
        const apiCall=async()=>{
        let formData = {}; // Define formData variable

        // Handle form submission based on the selected option
        if (selectedOption === "Give Money" || selectedOption === "Receive Money") {
            formData.moneyAmount = event.target.elements.moneyAmount.value;
        } else {
            formData.quantity = event.target.elements.quantity.value;
            formData.price = event.target.elements.price.value;
        }
        formData.selectedOption = selectedOption;
        formData.date = date;
        formData.userId=userId;
        let endpoint;
        if (selectedOption === "Give Money") {
            endpoint = "/addMoney";
        } else if (selectedOption === "Receive Money") {
            endpoint = "/receiveMoney";
        } else {
            endpoint = "/items";
        }

        try {
            // Send POST request using axios
            setUpAxios();
            const response = await axios.post(`${baseURL}${endpoint}`, formData, {
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
    toast.promise(
        apiCall(),
        {
          pending: 'Submitting your data...',
          success: 'Data submitted successfully 👌',
          error: 'Error submitting data 🤯'
        },
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce
        }
      );
    };

    return (<div>
     <div className="table-heading">  <h1>OtherItems</h1></div>
        <div className="DefaultEntry form others">
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    name="date"
                    value={date}
                    onChange={handleDateChange}
                    required
                />
                <select
                    value={selectedOption}
                    onChange={handleChange}
                >
                    <option value="Give Money">Give Money</option>
                    <option value="Feed">Feed</option>
                    <option value="Ghee">Ghee</option>
                    <option value="Receive Money">Receive Money</option>
                </select>
                {selectedOption === "Give Money" || selectedOption === "Receive Money" ? (
                    <input
                        type="number"
                        name="moneyAmount"
                        placeholder="Enter money"
                    />
                ) : (
                    <>
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Enter quantity"
                            required
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Enter price"
                            required
                        />
                    </>
                )}
                <button type="submit">Submit</button>
            </form>
        </div></div>
    );
}

export default DefaultEntry;
