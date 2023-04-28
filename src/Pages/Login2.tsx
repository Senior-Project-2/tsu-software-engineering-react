import React from "react";
import "../App.css";
import {useNavigate} from "react-router-dom";
import CreateAccount from "../Pages/CreateAccount"
function Login() {
const navigate = useNavigate();
const goToHome = () => navigate("/home");
const goToCreateAccount = () => navigate("/createaccount")

const users = [
    { id: 1, name: 'John',email: 'user1@gmail.com', password: '123456' },
    { id: 2, name: 'Pete' , email: 'user2@gmail.com', password: '123456' },
    { id: 3, name: 'Mary' , email: 'user3@gmail.com', password: '123456' },
];

    return(
   <div className="Login">
         <div className="LoginBox">
          <div className="LoginHeader">Sign In</div>
            <div className="inputs"/>
             <input className="email" placeholder="Email Address"/>
              <input
               className="password"
               placeholder="Password"
               type="password"
               />
           </div>
             <div style={{display:"flex", justifyContent:"center"}}>
               <button onClick={goToHome} className="submitbutton">Login</button>
             </div>
             <button onClick={goToCreateAccount} className="movetocreateaccount">Don't have an account? Click here to create an account.</button>
            </div>
           );
           }
      export default Login;