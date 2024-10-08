import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { baseURL } from './config'; // Adjust the import path as necessary
import setUpAxios from "./setUpAxios";
import { toast,Bounce } from "react-toastify";

function DefaultMilk({ userId,smallScreen }) {
  const [inputs, setInputs] = useState({
    date: "",
    weight: "",
    fat: "",
    snf: "",
    price: ""
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [time, setTime] = useState('morning');
  const [calculationType, setCalculationType] = useState("fat");
  const [animalType, setAnimalType] = useState("buffalo");
  const [date, setDate] = useState('');
  const [isAutoIncrement,setIsAutoIncrement] = useState(() => {
    // Initialize state from localStorage
    const savedAutoIncrement = localStorage.getItem("autoIncrement");
    return savedAutoIncrement === "true";
  });

  const ToggleAutoIncrement = () => {
    if(isAutoIncrement)
    {
      localStorage.setItem("autoIncrement","false");
      setIsAutoIncrement(false);
    }
    else{
      {
        localStorage.setItem("autoIncrement","true");
        setIsAutoIncrement(true);
      }
    }
  };
  // References to input fields
  const inputRefs = useRef({});
  // Set today's date when the component mounts
  useEffect(() => {
    const todayDate = new Date().toISOString().split('T')[0];
    setDate(todayDate);
}, []);
  const handleDateChange = (event) => {
    setDate(event.target.value);
};


  useEffect(() => {
    if (calculationType === "fat") {
      setInputs(prevInputs => ({
        ...prevInputs,
        price: calculatePriceBasedOnFat(animalType, inputs.fat)
      }));
    } else if (calculationType === "fatAndSNF") {
      setInputs(prevInputs => ({
        ...prevInputs,
        price: calculatePriceBasedOnFatAndSNF(animalType, inputs.fat, inputs.snf)
      }));
    }
  }, [inputs.fat, inputs.snf, calculationType, animalType]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  };

  const handleCalculationTypeChange = (value) => {
    setCalculationType(value);
  };

  const handleAnimalTypeChange = (value) => {
    setAnimalType(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const apiCall = async () => {
      let response;
      inputs.date = date;
      setUpAxios();
      if (userId) {
        response = await axios.post(`${baseURL}/admin/entries/${time}`, { ...inputs, userId });
      } else {
        response = await axios.post(`${baseURL}/entries/${time}`, inputs);
      }

      if (response.status === 200) {
        inputs.weight = "";
        inputs.fat = "";
        inputRefs.current[1].focus();

        if (isAutoIncrement) {
          const newDate = new Date(date);
          newDate.setDate(newDate.getDate() + 1);
          const formattedDate = newDate.toISOString().split('T')[0];
          setDate(formattedDate);
        }

        return response.data.message;
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


  const toggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const calculatePriceBasedOnFat = (animalType, fat) => {
    if (!fat) return "";  // No fat input, no price calculation
    let price = 0;
    let fatValue = parseFloat(fat);
  
    if (fatValue > 13) {
      fatValue /= 10;
    }
  
    if (animalType === "cow") {
      const cowFatPrices = localStorage.getItem("Cow_fatPrices");
      const parsedPrices = JSON.parse(cowFatPrices);
      const priceBelow35 = parsedPrices.below35;
      const priceAbove35 = parsedPrices.above35;
      if (fatValue < 3.5) {
        price = priceBelow35 * fatValue / 10;
      } else {
        price = priceAbove35 * fatValue / 10;
      }
    } else {
      const buffaloFatPrices = localStorage.getItem("buffalo_fatPrices");
      const parsedPrices = JSON.parse(buffaloFatPrices);
      const priceOn100 = parsedPrices.fat100;
      price = priceOn100 / 10 * fatValue;
    }
  
    return price.toFixed(2);
  };
  
  const calculatePriceBasedOnFatAndSNF = (animalType, fat, snf) => {
    if (!fat || !snf) return "";  // No fat or SNF input, no price calculation
    let price = 0;
    let fatValue = parseFloat(fat);
    let snfValue = parseFloat(snf);
  
    const localStorageKey = animalType === 'cow' ? 'cow-snf' : 'buffalo-snf';
    const storedPrices = JSON.parse(localStorage.getItem(localStorageKey));
  
    if (storedPrices && storedPrices.length > snfValue && storedPrices[snfValue].length > fatValue) {
      price = parseFloat(storedPrices[snfValue][fatValue]) || 0;
    }
  
    return price.toFixed(2);
  };
  

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      // Focus on the next input field
      if(inputRefs.current[4])
      {
        inputRefs.current[4].click();
      }
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  return (
    <div><div className="table-heading">  <h1>Milk Entries</h1></div>
    <div className="form" style={smallScreen ? { flexDirection: 'column' } : {}}>
      <div className="defaultButtons">
        <div className="button-group">
          <button
            type="button"
            className={`calc-button ${calculationType === "fat" ? "active" : ""}`}
            onClick={() => handleCalculationTypeChange("fat")}
          >
            Fat only
          </button>
          <button
            type="button"
            className={`calc-button ${calculationType === "fatAndSNF" ? "active" : ""}`}
            onClick={() => handleCalculationTypeChange("fatAndSNF")}
          >
            Fat and SNF
          </button>
        </div>

        <div className="button-group">
          <button
            type="button"
            className={`animal-button ${animalType === "buffalo" ? "active" : ""}`}
            onClick={() => handleAnimalTypeChange("buffalo")}
          >
            Buffalo
          </button>
          <button
            type="button"
            className={`animal-button ${animalType === "cow" ? "active" : ""}`}
            onClick={() => handleAnimalTypeChange("cow")}
          >
            Cow
          </button>
        </div>

        <div className="button-group">
          <button
            type="button"
            className={`time-button ${time === "morning" ? "active" : ""}`}
            onClick={() => setTime("morning")}
          >
            Morning
          </button>
          <button
            type="button"
            className={`time-button ${time === "evening" ? "active" : ""}`}
            onClick={() => setTime("evening")}
          >
            Evening
          </button>

        </div>
        <div className="button-group">
        <input
        type="checkbox"
        checked={isAutoIncrement}
        id="autoIncrementDate"
        onChange={ToggleAutoIncrement}
      />
        <label for="autoIncrementDate">Auto increment date</label>
        </div>
      </div>
      <form id="myForm" onSubmit={handleSubmit}>
        <div className="DefaultEntry">
          <input
            name="date"
            id="date"
            type={isDatePickerOpen ? 'date' : 'date'}
            onFocus={toggleDatePicker}
            onBlur={toggleDatePicker}
            value={date}
            onChange={handleDateChange}
            onKeyDown={(e) => handleKeyDown(e, 0)}
            ref={(el) => (inputRefs.current[0] = el)}
          />
          <label htmlFor="date" className={`input-label ${inputs.date ? "visited" : "visited"}`}>Date</label>
        </div>
        <div className="DefaultEntry">
          <input
            name="weight"
            id="weight"
            type="number"
            pattern="[0-9]+(\.[0-9]+)?"
            required
            value={inputs.weight}
            onChange={handleChange}
            className={inputs.weight ? "visited" : "not_visited"}
            onKeyDown={(e) => handleKeyDown(e, 1)}
            ref={(el) => (inputRefs.current[1] = el)}
          />
          <label htmlFor="weight" className={`input-label ${inputs.weight ? "visited" : "not_visited"}`}>Weight</label>
        </div>
        <div className="DefaultEntry">
          <input
            name="fat"
            id="fat"
            type="number"
            pattern="[0-9]+(\.[0-9]+)?"
            value={inputs.fat}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 2)}
            ref={(el) => (inputRefs.current[2] = el)}
          />
          <label htmlFor="fat" className={`input-label ${inputs.fat ? "visited" : "not_visited"}`}>Fat</label>
        </div>
        {calculationType!="fat" && <div className="DefaultEntry">
          <input
            name="snf"
            id="snf"
            type="number"
            pattern="[0-9]+(\.[0-9]+)?"
            value={inputs.snf}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 3)}
            ref={(el) => (inputRefs.current[3] = el)}
          />
          <label htmlFor="snf" className={`input-label ${inputs.snf ? "visited" : "not_visited"}`}>SNF</label>
        </div> }
        <div className="DefaultEntry">
          <input
            name="price"
            id="price"
            type="number"
            pattern="[0-9]+(\.[0-9]+)?"
            value={inputs.price}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 5)}
            ref={(el) => (inputRefs.current[5] = el)}
          />
          <label htmlFor="price" className={`input-label ${inputs.price ? "visited" : "not_visited"}`}>Price</label>
        </div>
        <button style={{display:"flex",justifyContent:"center",alignItems:"center", height:"30px", color:"white"}} type="submit" value="Submit"
         onKeyDown={(e) => handleKeyDown(e, 4)}
         ref={(el) => (inputRefs.current[4] = el)}
         >Submit</button>
      </form>
    </div></div>
  );
}

export default DefaultMilk;
