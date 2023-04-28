import "../App.css";
//import { faBell } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";

function onClickHandler(){
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll(".navbar-burger"), 0);

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
    });
}

function Header() {
//const navigate = useNavigate();
//const goToInventoryList = () => navigate("/inventorylist");
    return (
        <nav className="navbar has-background-dark test-app-header" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a href="/" className="navbar-item">
                <img
                    src={require("./hashtag.png")}
                    alt="Logo"
                    width="auto"
                    height="auto"
                />
                </a>
                <button className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={onClickHandler}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </button>
            </div>
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start panel-tabs">
                    <h1 className="navbar-item bluecolor" aria-current="page" text-align='center'>ABC Industrial Management System</h1>
                    <a className="navbar-item" href="/home">Home</a>
                    <a className="navbar-item" href="/inventorylist">Inventory List</a>
                    {/*}<button onClick={goToInventoryList} className="submitbutton">InventoryList</button>*/}
                    <a className="navbar-item" href="/resourcelist">Resources List</a>
                    {/*<h2 className=" ">--------------------------------------------------</h2>*/}
                    {/*<h1 className="navbar-item bg-blue" aria-current="page" text-align='center'>ABC Industrial Management System</h1>*/}
                    {/*<h2 className=" ">--------------------------------------------------</h2>*/}
                </div>
            </div>
        </nav>
    );
}

export default Header;