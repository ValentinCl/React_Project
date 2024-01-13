import React, { useState } from "react";
import "./LoginSignup.css";

const LoginSignup = () =>{

  const [action,setAction] = useState("Sign up");

  return(
    <div className="container">
      <div className="Header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="input">
        {action==="Login"?<div></div>:
          <div className="input">
            <input type="email" placeHolder="Email"/>
          </div>        
        }
        <div className="input">
          <input type="text" placeHolder="Pseudo"/>
        </div>
        <div className="input">
          <input type="password" placeHolder="Mot de passe"/>
        </div>                
      </div>
      <div className="submit-container">
        <div className={action=== "Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign up")}}>Sign up</div>
        <div className={action=== "Sign up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
      </div>
    </div>
  )
}

export default LoginSignup;