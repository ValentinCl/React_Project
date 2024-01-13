import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import LoginSignup from "../components/LoginSignup";

function Home() {
  return (
    <div className="home">
      <div className="headerContainer">
        <h1> Login/Sign up </h1>
        <LoginSignup/>
      </div>
    </div>
  );
}

export default Home;