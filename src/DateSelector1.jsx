import React, { useState } from 'react';
import moment from 'moment';

function DateSelector1({ onSelectDateRange }) {
    const [selectedMonth, setSelectedMonth] = useState('');

    const handleMonthChange = (event) => {
        const selectedMonth = event.target.value;
        setSelectedMonth(selectedMonth);
    
        if (selectedMonth !== "") {
            // Calculate start and end dates based on the selected month
            const startDate = moment(selectedMonth, 'YYYY-MM').startOf('month').format('YYYY-MM-DD');
            const endDate = moment(selectedMonth, 'YYYY-MM').endOf('month').format('YYYY-MM-DD');
    
            onSelectDateRange(startDate, endDate);
        }
    };
    

    const handleDateRange = (range) => {
        let startDate, endDate;

        switch (range) {
            case 'overall':
                startDate = ''; // Set to empty string to indicate overall
                endDate = '';
                break;
            case 'thisMonth':
                startDate = moment().startOf('month').format('YYYY-MM-DD');
                endDate = moment().endOf('month').format('YYYY-MM-DD');
                break;
            case 'lastMonth':
                startDate = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
                endDate = moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
                break;
            case 'last3Months':
                startDate = moment().subtract(3, 'months').startOf('month').format('YYYY-MM-DD');
                endDate = moment().format('YYYY-MM-DD');
                break;
            case 'last6Months':
                startDate = moment().subtract(6, 'months').startOf('month').format('YYYY-MM-DD');
                endDate = moment().format('YYYY-MM-DD');
                break;
            default:
                startDate = '';
                endDate = '';
        }

        onSelectDateRange(startDate, endDate);
    };

    return (
        <div className='BalanceButtons'>
            <button onClick={() => handleDateRange('overall')}>Overall</button>
            <button onClick={() => handleDateRange('thisMonth')}>This Month</button>
            <button onClick={() => handleDateRange('lastMonth')}>Last Month</button>
            <button onClick={() => handleDateRange('last3Months')}>Last 3 Months</button>
            <button onClick={() => handleDateRange('last6Months')}>Last 6 Months</button>
            <select value={selectedMonth} onChange={handleMonthChange}>
                <option value="">Select Month</option>
                {[...Array(12).keys()].map(month => (
                    <option key={month} value={moment().month(month).format('YYYY-MM')}>
                        {moment().month(month).format('MMMM YYYY')}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default DateSelector1;
