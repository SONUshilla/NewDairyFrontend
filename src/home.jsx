import React from "react";
import { Link } from "react-router-dom";
import dairyImage from "./images/pexels-matthias-zomer-422218.jpg";
import farmImage from "./images/leon-ephraim-AxoNnnH1Y98-unsplash.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCow, faWeight, faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import WaterBuffaloIcon from './Iconss/water-buffalo.svg';
import "./home.css";

function Home({ isLoggedIn }) {
    if (!isLoggedIn) {
        return (
            <div className="home-container">
                <div className="home-content">
                    <div className="main-home">
                        <img src={dairyImage} alt="Milk Entries" className="full-screen-image" />
                        <div className="overlay"></div>
                        <div className="content-container">
                            <h1>Welcome to Our Dairy Management System</h1>
                            <p>Manage your dairy farm efficiently with our comprehensive dairy management system.</p>
                        </div>
                    </div>

                    <div className="feature-section">
                        <div className="feature">
                            <img src={dairyImage} alt="Milk Entries" />
                            <h2>Milk Entries</h2>
                            <p>Record daily milk production entries with ease.</p>
                            <Link to="/login" className="btn">Enter Milk</Link>
                        </div>
                        <div className="feature">
                            <img src={farmImage} alt="Feed Supplements" />
                            <h2>Feed Supplements</h2>
                            <p>Track feed supplements and manage your herd's nutrition.</p>
                            <Link to="/login" className="btn">Manage Feed</Link>
                        </div>
                        <div className="feature">
                            <img src={dairyImage} alt="Balance" />
                            <h2>Balance Management</h2>
                            <p>Keep track of your dairy's financial balance and transactions.</p>
                            <Link to="/login" className="btn">Manage Balance</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="Home-icons">
                <Link className="btn" to={"/cow/prices"}>
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faCow} size="3x" className="icon" />
                        <span>Cow</span>
                    </div>
                </Link>
                <br />
                <Link className="btn" to={"/buffalo/prices"}>
                    <div className="icon-container">
                        <img src={WaterBuffaloIcon} alt="Water Buffalo Icon" className="icon-svg" />
                        <span>Buffalo</span>
                    </div>
                </Link>
                <br />
                <Link className="btn " to={"/cow/prices/snf"}>
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faCow} size="3x" className="icon btn2" />
                        <span>Cow Snf and Fat</span>
                    </div>
                </Link>
                <br />
                <Link className="btn " to={"/buffalo/prices/snf"}>
                    <div className="icon-container">
                    <img src={WaterBuffaloIcon} alt="Water Buffalo Icon" className="icon-svg btn2" />
                        <span>Buffalo Snf and Fat</span>
                    </div>
                </Link>
                <br />
            </div>
        );
    }
}

export default Home;
