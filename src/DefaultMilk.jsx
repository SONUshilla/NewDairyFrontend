import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { baseURL } from './config'; // Adjust the import path as necessary
import setUpAxios from "./setUpAxios";

function DefaultMilk({ userId }) {
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let response;
      inputs.date=date;
      if (userId) {
        setUpAxios();
        response = await axios.post(`${baseURL}/admin/entries/${time}`, { ...inputs, userId });
      } else {
        setUpAxios();
        response = await axios.post(`${baseURL}/entries/${time}`, inputs);
      }

      if (response.status === 200) {
        inputRefs.current[1].focus(); // Focus on the next input field
        inputs.weight="";
        inputs.fat="";
        if (isAutoIncrement) {
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() + 1); // Increment the date by 1 day
            
            // Format the new date to 'YYYY-MM-DD'
            const formattedDate = newDate.toISOString().split('T')[0];
            setDate(formattedDate); // Update the state with the new date
            
            console.log(formattedDate); // Log the updated date
        }

      console.log(response.data.message);
      }
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  const toggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const calculatePriceBasedOnFat = (animalType, fat) => {
    let price = 0;
    let fatValue = parseFloat(fat);

    if (fatValue > 13) {
      fatValue /= 10;
    }

    /*const localStorageKey = animalType === "cow" ? "Cow_fatPrices" : "buffalo_fatPrices";
    const fatPrices = JSON.parse(localStorage.getItem(localStorageKey));

    if (fatPrices) {
      const foundObject = fatPrices.find(obj => obj.value === fatValue);
      if (foundObject) {
        price = parseFloat(foundObject.inputValue);
      }
    }*/
   if(animalType=="cow")
   {
    const price2=localStorage.getItem("cowFatPrices");
    if(fat>35){
      price=fat*((price2+10)/100);
     }
     else{
     price=fat*price2/100;
     }
   }
  
    return price.toFixed(2);
  };

  const calculatePriceBasedOnFatAndSNF = (animalType, fat, snf) => {
    let price = 0;
    let fatValue = parseFloat(fat);
    let snfValue = parseFloat(snf);

    const localStorageKey = animalType === 'cow' ? 'cowChartData' : 'buffaloChartData';
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
    <div className="form">
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
        onClick={ToggleAutoIncrement}
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
        <button style={{height:"30px", color:"white"}} type="submit" value="Submit"
         onKeyDown={(e) => handleKeyDown(e, 4)}
         ref={(el) => (inputRefs.current[4] = el)}
         />
      </form>
    </div>
  );
}

export default DefaultMilk;
