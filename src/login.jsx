import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate,Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { FaRegUser,FaGoogle } from 'react-icons/fa';
import { baseURL } from './config'; // Adjust the import path as necessary
const LoginPage = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [error,setError]=useState("");
  const [check,setCheck]=useState(false);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn") === "true");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${baseURL}/login`, {
        username: loginUsername,
        password: loginPassword
      });
      if (response.status === 200) {
        setLoggedIn(true);
        localStorage.setItem("loggedIn", "true");
        console.log(response.data.type);
        localStorage.setItem("type", response.data.type);
        window.location.reload();
      } else {
        console.error('Login failed');
        localStorage.setItem("loggedIn", "false");
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        // Show the error message to the user
        localStorage.setItem("loggedIn", "false");
        setError(error.response.data.message);
      }
    }
  };
  

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${baseURL}/register`, {
        username: registerUsername,
        password: registerPassword
      });
      if (response.status === 201) { // Corrected status check to 201 for successful registration
        setLoggedIn(true);
        localStorage.setItem("loggedIn", "true");
        window.location.reload();
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        // Show the error message to the user
        localStorage.setItem("loggedIn", "false");
        setError(error.response.data.message);
      }
    }
  };
  
useEffect(()=>{
  loggedIn && navigate("/home");
},[])

const handle=()=>{
  const res= window.open(`${baseURL}/auth/google`,"_self");
}

  
  return (
    <div className="login-container">
        <div className="login-form">
        {error && <p className="error-message">{error}</p>}
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>

          <h2>Register</h2>
          <input
            type="text"
            placeholder="Username"
            value={registerUsername}
            onChange={(e) => setRegisterUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
          <button onClick={handleRegister}>Register</button>
          
          <div className="login-options">
            <Link to="/admin">
              Admin ? login here 
            </Link>
        <button onClick={handle}>
            <FaGoogle className="icon" /> Login with Google
            </button>
          </div>
        </div>
    </div>
  );
};

export default LoginPage;
