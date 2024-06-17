import React, { useState, useEffect } from "react";
import moment from "moment";

function DATES({ currentDate, setting }) {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());

  useEffect(() => {
    let newStartDate, newEndDate;

    if (currentDate.date() <= 10) {
      newStartDate = currentDate.clone().date(1);
      newEndDate = currentDate.clone().date(10);
    } else if (currentDate.date() <= 20) {
      newStartDate = currentDate.clone().date(11);
      newEndDate = currentDate.clone().date(20);
    } else {
      newStartDate = currentDate.clone().date(21);
      newEndDate = currentDate.clone().endOf("month");
    }

    setStartDate(newStartDate);
    setEndDate(newEndDate);
  }, [currentDate]);

  useEffect(() => {
    // Update startDate and endDate in the parent component
    setting(startDate, endDate);
  }, [startDate, endDate, setting]);

  return null; // You should return some JSX here
}

export default DATES;
