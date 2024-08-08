import React, { useState, useEffect } from "react";
import axios from 'axios';
import CowPriceEntryGrid from './CowPriceEntryGrid'; // Import the CowPriceEntryGrid component
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
  const [time, setTime] = useState('morning'); // Default time selecteds
  const [calculationType, setCalculationType] = useState("fat");
  const [animalType, setAnimalType] = useState("buffalo"); // Default animal type is buffalo
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

  const handleCalculationTypeChange = (event) => {
    setCalculationType(event.target.value);
  };

  const handleAnimalTypeChange = (event) => {
    setAnimalType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let response;
      if (userId) {
        setUpAxios();
        response = await axios.post(`${baseURL}/admin/entries/${time}`, { ...inputs, userId });
      } else {
        setUpAxios();
        response = await axios.post(`${baseURL}/entries/${time}`, inputs);
      }

      if (response.status === 200) {
        alert('Data inserted successfully');
      }
      console.log(response.data.message);
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
      fatValue /= 10; // Convert "10.0" to "1.0"
    }
  
    if (animalType === "cow") {
      let cowFatPrices = JSON.parse(localStorage.getItem("Cow_fatPrices"));
  
      // Check if cowFatPrices is not null before using find
      if (cowFatPrices) {
        const foundObject = cowFatPrices.find(obj => obj.value === fatValue);
        if (foundObject) {
          price = parseFloat(foundObject.inputValue);
        }
      }
    } else if (animalType === "buffalo") {
      let buffaloFatPrices = JSON.parse(localStorage.getItem("buffalo_fatPrices"));
  
      // Check if buffaloFatPrices is not null before using find
      if (buffaloFatPrices) {
        const foundObject = buffaloFatPrices.find(obj => obj.value === fatValue);
        if (foundObject) {
          price = parseFloat(foundObject.inputValue);
        }
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
    const prices = storedPrices 
    // Check if prices exist and if the indices are within bounds
    if (prices && prices.length > snfValue && prices[snfValue].length > fatValue) {
        price = parseFloat(prices[snfValue][fatValue]) || 0;
    }

    return price.toFixed(2);
};


  return (
    <div>
      <div className="radios">
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="calculationType"
              value="fat"
              checked={calculationType === "fat"}
              onChange={handleCalculationTypeChange}
            />Fat only
          </label>
          <label>
            <input
              type="radio"
              name="calculationType"
              value="fatAndSNF"
              checked={calculationType === "fatAndSNF"}
              onChange={handleCalculationTypeChange}
            />Fat and SNF
          </label>
        </div>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="animalType"
              value="buffalo"
              checked={animalType === "buffalo"}
              onChange={handleAnimalTypeChange}
            />Buffalo
          </label>
          <label>
            <input
              type="radio"
              name="animalType"
              value="cow"
              checked={animalType === "cow"}
              onChange={handleAnimalTypeChange}
            />Cow
          </label>
        </div>
        <div className="radio-group">
          <label >
            <input
              type="radio"
              id="morning"
              name="time"
              value="morning"
              checked={time === 'morning'}
              onChange={() => setTime('morning')}
            />Morning
          </label>
          <label >
            <input
              type="radio"
              id="evening"
              name="time"
              value="evening"
              checked={time === 'evening'}
              onChange={() => setTime('evening')}
            />Evening
          </label>
        </div>
      </div>
      <form id="myForm" onSubmit={handleSubmit}>
        <div className="DefaultEntry">
          <input
            name="date"
            id="date"
            type={isDatePickerOpen ? 'date' : 'text'}
            value={inputs.date}
            onChange={handleChange}
            onFocus={toggleDatePicker}
            onBlur={toggleDatePicker}
          />
          <label htmlFor="date" className={`input-label ${inputs.date ? "visited" : "not_visited"}`}>Date</label>
        </div>
        <div className="DefaultEntry">
          <input
            name="weight"
            id="weight"
            type="text"
            pattern="[0-9]+(\.[0-9]+)?"
            required
            value={inputs.weight}
            onChange={handleChange}
            className={inputs.weight ? "visited" : "not_visited"}
          />
          <label htmlFor="weight" className={`input-label ${inputs.weight ? "visited" : "not_visited"}`}>Weight</label>
        </div>
        <div className="DefaultEntry">
          <input
            name="fat"
            id="fat"
            type="text"
            pattern="[0-9]+(\.[0-9]+)?"
            value={inputs.fat}
            onChange={handleChange}
          />
          <label htmlFor="fat" className={`input-label ${inputs.fat ? "visited" : "not_visited"}`}>Fat</label>
        </div>
        <div className="DefaultEntry">
          <input
            name="snf"
            id="snf"
            type="text"
            pattern="[0-9]+(\.[0-9]+)?"
            value={inputs.snf}
            onChange={handleChange}
          />
          <label htmlFor="snf" className={`input-label ${inputs.snf ? "visited" : "not_visited"}`}>SNF</label>
        </div>
        <div className="DefaultEntry">
          <input
            name="price"
            id="price"
            type="text"
            pattern="[0-9]+(\.[0-9]+)?"
            value={inputs.price}
            onChange={handleChange}
          />
          <label htmlFor="price" className={`input-label ${inputs.price ? "visited" : "not_visited"}`}>Price</label>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default DefaultMilk;
