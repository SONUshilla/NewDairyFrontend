import React from "react";
import itemImage1 from "./images/item1.png";
import itemImage2 from "./images/item2.png";
import itemImage3 from "./images/item3.png";
import poster from "./images/home.jpg";
import './home.css';
import Footer from "./footer";
import CustomerTable from "./customerTable";

function Home({ isLoggedIn }) {

  if (isLoggedIn) {
    return (
      <div className="homepage-grid">
        <div className="homepage-card1">
          <CustomerTable/>
        </div>
        <div className="homepage-card2">
        <h3 className="table-heading">Stock Table</h3>
        <div className="stock-table">
               
                <span >item</span>
                <span className="name">Quantity sold</span>
                <span className="name">Amount</span>
        </div>
        </div>
        <>
        <div className="homepage-card3">
        <h3 className="table-heading">Stock Table</h3>
        
    <div className="summary-item">
        <span className="label">Milk Arrived Today:</span>
        <span className="value">500 liters</span>
    </div>
    <div className="summary-item">
        <span className="label">Feed Sold:</span>
        <span className="value">300 kg</span>
    </div>
    <div className="summary-item">
        <span className="label">Ghee Sold:</span>
        <span className="value">50 kg</span>
    </div>
    <div className="summary-item">
        <span className="label">Money Given:</span>
        <span className="value">₹20,000</span>
    </div>
    <div className="summary-item">
        <span className="label">Money Received:</span>
        <span className="value">₹15,000</span>
    </div>
</div></>

      </div>
    );
  }
  
  



  return (<>
    <header className="hero-section">
    <div className="text-content">
   <div>
   <h3>Welcome to</h3>
      <h1>Dairy</h1>
      <p>Where you can manage and store you daily Dairy related transaction</p>
   </div>
    </div>
    <div className="image-section">
      <img className="image-hero" src={poster} alt="Hero" />
    </div>
  </header>

  <div className="homepage-body"> 
  <div className="feature-section">
  <div className="feature-box">
    <img className="feature-image" src={itemImage1} alt="feature 1"></img>
    <p>Store Your Data Easily</p>
  </div>
  <div className="feature-box">
    <img className="feature-image" src={itemImage2} alt="feature 1"></img>
    <p>See your Entries</p>
  </div>
  <div className="feature-box">
    <img className="feature-image" src={itemImage3} alt="feature 1"></img>
    <p>Manage you BalanceSheet</p>
  </div>


  </div>
  </div>
  <Footer/>
  </>
  );
}

export default Home;
