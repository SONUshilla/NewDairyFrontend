import React, { useState, useEffect } from "react";
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
      fatValue /= 10;
    }

    const localStorageKey = animalType === "cow" ? "Cow_fatPrices" : "buffalo_fatPrices";
    const fatPrices = JSON.parse(localStorage.getItem(localStorageKey));

    if (fatPrices) {
      const foundObject = fatPrices.find(obj => obj.value === fatValue);
      if (foundObject) {
        price = parseFloat(foundObject.inputValue);
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
        <button style={{height:"30px", color:"white"}} type="submit" value="Submit" />
      </form>
    </div>

  );
}

export default DefaultMilk;
