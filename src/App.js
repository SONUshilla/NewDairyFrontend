import "./styles.css";
import Header from "./header";
import Sidebar from "./sidebar";
import Main from "./main";
import { useEffect, useState } from "react";
import {BrowserRouter as Router} from "react-router-dom";
import Footer from "./footer";
import BottomBar from "./bottom-nav";
export default function App() {
  return (
    <Router>
      <div className="container">
        <Main />
        <BottomBar/>
        <Footer/>
      </div>
      </Router>
  );
}
