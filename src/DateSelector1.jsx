import React, { useState } from 'react';
import moment from 'moment';
import "./DateSelector1.css";

function DateSelector1({ onSelectDateRange }) {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [activeRange, setActiveRange] = useState(''); // New state for active button

    const handleMonthChange = (event) => {
        const selectedMonth = event.target.value;
        setSelectedMonth(selectedMonth);
        console.log('Selected Month:', selectedMonth); // Debug log

        if (selectedMonth !== "") {
            // Calculate start and end dates based on the selected month
            const startDate = moment(selectedMonth, 'YYYY-MM').startOf('month').format('YYYY-MM-DD');
            const endDate = moment(selectedMonth, 'YYYY-MM').endOf('month').format('YYYY-MM-DD');
            console.log('Start Date:', startDate); // Debug log
            console.log('End Date:', endDate); // Debug log

            onSelectDateRange(startDate, endDate);
        }
    };

    const handleDateRange = (range) => {
        setActiveRange(range); // Set the active range
        let startDate, endDate;

        switch (range) {
            case 'overall':
                startDate = '1900-01-01'; // Start of 1900
                endDate = '3000-12-31';   // End of 3000
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

        console.log('Range:', range); // Debug log
        console.log('Start Date:', startDate); // Debug log
        console.log('End Date:', endDate); // Debug log

        onSelectDateRange(startDate, endDate);
    };

    return (
<div className='BalanceButtons'>
    <select value={selectedMonth} onChange={(e) => {
        handleMonthChange(e);
        handleDateRange(e.target.value);
    }}>
        <option value="">Select Month</option>
        <option value="overall" style={{ color: activeRange === 'overall' ? '#007BFF' : 'initial' }}>
            Overall
        </option>
        <option value="thisMonth" style={{ color: activeRange === 'thisMonth' ? '#007BFF' : 'initial' }}>
            This Month
        </option>
        <option value="lastMonth" style={{ color: activeRange === 'lastMonth' ? '#007BFF' : 'initial' }}>
            Last Month
        </option>
        <option value="last3Months" style={{ color: activeRange === 'last3Months' ? '#007BFF' : 'initial' }}>
            Last 3 Months
        </option>
        <option value="last6Months" style={{ color: activeRange === 'last6Months' ? '#007BFF' : 'initial' }}>
            Last 6 Months
        </option>
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
