import React from "react";
import itemImage1 from "./images/item1.png";
import itemImage2 from "./images/item2.png";
import itemImage3 from "./images/item3.png";
import poster from "./images/home.jpg";
import './home.css';
import Footer from "./footer";

function Home({ isLoggedIn }) {


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
