import React from 'react';
import { Link, json, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios here
import './Login'

const Home = (props) => {
  const navigate = useNavigate();
  const username= JSON.parse(localStorage.getItem("username"));

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className='homepage'> 
    <h1 style={{position:"relative",top:"550px",left:"700px",fontSize:"100px",color:"darkblue"}} > {username} </h1>
     {username && <button className='btn' onClick={handleLogout} style={{fontSize:"40px", backgroundColor:"gray", padding:"10px",fontWeight:"bold",borderStyle:"none",border:"2px solid black",curson:"pointer"}}>Log Out</button>}
    </div>
  );
}

export default Home;
