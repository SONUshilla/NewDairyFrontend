import React, { useEffect,useState } from 'react';
import moment from 'moment';
import Showdate from './showDate';
import DateSelector from './DateSelector';

function DateRange(props) {
  const [startDate, setStartDate] = useState(moment());
    const [endDate, setEndDate] = useState(moment());

function updateDates(d1,d2)
{
  setStartDate(d1);
  setEndDate(d2);
}
  // Function to generate dates between two dates
  const getDatesBetween = (startDate, endDate) => {
    const dates = [];
    let currentDate = moment(startDate);

    while (currentDate <= moment(endDate)) {
      dates.push(moment(currentDate).format('DD-MMM-YYYY'));
      currentDate.add(1, 'days');
    }

    return dates;
  };

  // Get dates between startDate and endDate
  const datesBetween = getDatesBetween(startDate, endDate);
  
  useEffect(() => {
    props.settingDate(datesBetween);
  }, [startDate,endDate]);

  // Render the dates in an h1 element
  return <div>
    <DateSelector updateDates={updateDates}/>
  </div>;
}

export default DateRange;