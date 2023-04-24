import React from "react";
import "../App.css";
import {useNavigate} from "react-router-dom";
import Login from "../Pages/Login"
function CreateAccount() {
const navigate = useNavigate();
const goToLogin = () => navigate("/login");
const goToHome = () => navigate("/home");
  return (
    <div className="Login">
      <div className="LoginBox">
       <div className="LoginHeader">Create An Account</div>
         <div className="inputs"/>
          <input className="email" placeholder="Email Address"/>
           <input
            className="password"
            placeholder="Password"
            type="password"
            />
            <input className="confirmPassword" placeholder="Password" type="password"/>
        </div>
          <div style={{display:"flex", justifyContent:"center"}}>
            {/*<button className="submitbutton">Sign-Up</button>*/}
            <button onClick={goToHome} className="submitbutton">Sign-Up</button>
          </div>
          <button onClick={goToLogin} className="movetologin">Already have an account? Sign-In.</button>
         </div>
        );
        }
  export default CreateAccount;