import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Don't forget to import axios
import { Outlet } from 'react-router-dom';
import Table1 from './Table1';


function Table({ datesBetween }) {
  const [work, setWork] = useState(datesBetween);
  const [key, setKey] = useState(0); // Add key state

  useEffect(() => {
    setWork(datesBetween);
    // Update the key to trigger re-rendering of input fields
    setKey(prevKey => prevKey + 1);
  }, [datesBetween]);


  


  
  return (
    <div className='Table1'>


    
     <Table1 work={work} timing="morning"  ></Table1>
     <Table1 work={work} timing="evening" ></Table1>
    </div>
  );
}

export default Table;
