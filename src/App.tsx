 import "./App.css";
 import About from "./Views/About";
 import Home from "./Views/Home";
 import Login from "./Pages/Login";
  import Login2 from "./Pages/Login";
 import CreateAccount from "./Pages/CreateAccount"
 import InventoryList from "./Pages/ClientHomepage"
 import ResourceList from "./Pages/ResourceList"

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
function App() {
  return (
          <Router>
             <Routes>
                 <Route path="/">
                     <Route path="home" element={<Home/>}></Route>
                     <Route index element={<Login />}></Route>
                     <Route path="createAccount" element={<CreateAccount />}></Route>
                     <Route path="about" element={<About/>}></Route>
                     <Route path="inventorylist" element={<InventoryList/>}></Route>
                     <Route path="resourcelist" element={<ResourceList/>}></Route>
                     <Route path="login2" element={<Login2/>}></Route>
                 </Route>
             </Routes>
          </Router>

         );
    }
export default App;







