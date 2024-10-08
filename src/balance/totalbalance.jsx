import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from '../config'; // Adjust the import path as necessary
import setUpAxios from "../setUpAxios";
import Spinner from "../Spinner";
function TotalBalance({ startDate, endDate, userId ,AssociateUser}) {
  const [totalBefore,setTotalBefore]=useState("");
  const [milk, setMilk] = useState("");
  const [milkQuantity, setMilkQuantity] = useState("");
  const [feed, setFeed] = useState("");
  const [feedQuantity, setFeedQuantity] = useState("");
  const [ghee, setGhee] = useState("");
  const [gheeQuantity, setGheeQuantity] = useState("");
  const [moneyReceived, setMoneyReceived] = useState("");
  const [moneyGiven, setMoneyGiven] = useState("");
  const [grandTotal, setGrandTotal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const[admin,setAdmin]=useState(false);
  const fetchData = async (startDate, endDate) => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (userId) {
        setUpAxios();
        // If userId is present, send userId with the request to '/admin/showBalance'
        response = await axios.post(`${baseURL}/admin/showBalance`, { startDate, endDate, userId });
        setAdmin(true);
      } else {
        setUpAxios();
        // Otherwise, send request to '/showBalance' (default endpoint)
        response = await axios.post(`${baseURL}/showBalance`, { startDate, endDate });
        setAdmin(false);
      }

     
      const { milk, feed, money, ghee, moneyGivenResults, moneyReceivedResults,Before} =
        response.data;
      setTotalBefore(Before.total);
      setMilk(milk.total);
      setMilkQuantity(milk.totalMilk);
      setFeed(feed.totalMoney);
      setFeedQuantity(feed.totalQuantity);
      setMoneyReceived(moneyReceivedResults.totalMoney);
      setMoneyGiven(moneyGivenResults.totalMoney);
      setGhee(ghee.totalMoney);
      setGheeQuantity(ghee.totalQuantity);
      setGrandTotal(
        (
          Before.total +
          milk.total -
          feed.totalMoney -
          moneyReceivedResults.totalMoney +
          moneyGivenResults.totalMoney -
          ghee.totalMoney
        ).toFixed(2)
      );      
    } catch (error) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(startDate, endDate);
  }, [startDate, endDate, userId]); // Include userId in the dependency array

  if (loading) {
    return <div><Spinner></Spinner></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container1">
    <table className="morningEntries">
      <thead>
        <tr className="MorningHeading">
          <th>Type</th>
          <th>Quantity</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
      <tr className="MorningData">
          <td>balance before</td>
          <td>----</td>
          <td>{totalBefore}</td>
        </tr>
        <tr className="MorningData">
          <td>Milk</td>
          <td>{milkQuantity}</td>
          <td>{milk}</td>
        </tr>
        <tr className="MorningData">
          <td>Feed</td>
          <td>{feedQuantity}</td>
          <td>{feed}</td>
        </tr>
        <tr className="MorningData">
          <td>Ghee</td>
          <td>{gheeQuantity}</td>
          <td>{ghee}</td>
        </tr>
        <tr className="MorningData">
          <td>Payment Received</td>
          <td>--</td>
          <td>{moneyReceived}</td>
        </tr>
        <tr className="MorningData">
          <td>Payment Given</td>
          <td>--</td>
          <td>{moneyGiven}</td>
        </tr>
        <tr className="MorningData">
          <th>Total</th>
          <th></th>
          <th>{grandTotal}</th>
        </tr>

      </tbody>
    </table>
    </div>
  );
}

export default TotalBalance;
