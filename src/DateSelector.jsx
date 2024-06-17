import React, { useState, useEffect } from "react";
import moment from "moment";
import DATES from "./DATING";

export default function DateSelector({ updateDates }) {
  const [currentDate, setCurrentDate] = useState(moment());
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());

  useEffect(() => {
    if (updateDates) {
      updateDates(startDate, endDate);
    }
  }, [startDate, endDate, updateDates]);

  function handleChange(e) {
    if (e.target.textContent === "<") {
      const newCurrentDate = currentDate.clone().subtract(10, "days");
      setCurrentDate(newCurrentDate);
    } else if (e.target.textContent === ">") {
      const newCurrentDate = currentDate.clone().add(10, "days");
      setCurrentDate(newCurrentDate);
    }
  }

  function setting(d1, d2) {
    setStartDate(d1);
    setEndDate(d2);
  }

  return (
    <div className="selectDate">
      <DATES currentDate={currentDate} setting={setting} />
        <input
          type="date"
          Value={startDate.format("YYYY-MM-DD")}
          onChange={(e) => setStartDate(moment(e.target.value))}
          placeholder="startDate"
        />
        <input
          type="date"
          Value={endDate.format("YYYY-MM-DD")}
          onChange={(e) => setEndDate(moment(e.target.value))}
          placeholder="EndDate"/>

      
        <button onClick={handleChange}>{"<"}</button>
        <button onClick={handleChange}>{">"}</button>
    </div>
  );
}
