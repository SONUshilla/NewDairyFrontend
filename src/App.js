import "./styles.css";
import Header from "./header";
import Sidebar from "./sidebar";
import Main from "./main";
import { useEffect, useState } from "react";
import {BrowserRouter as Router} from "react-router-dom";
import BottomBar from "./bottom-nav";
import { ToastContainer ,Bounce} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export default function App() {
  return (
    <Router>
      <div className="container">
        <Main />
        <BottomBar/>
        <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"/>
      </div>
      </Router>
  );
}
