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

// import React, { useState } from "react";
//
// export const Login = (props) => {
//     const [email, setEmail] = useState('');
//     const [pass, setPass] = useState('');
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(email);
//     }
//
//     return (
//         <div className="auth-form-container">
//             <h2>Login</h2>
//             <form className="login-form" onSubmit={handleSubmit}>
//                 <label htmlFor="email">email</label>
//                 <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
//                 <label htmlFor="password">password</label>
//                 <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
//                 <button type="submit">Log In</button>
//             </form>
//             <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
//         </div>
//     )
// }

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