import React, { useState } from "react";
import { FaShoppingCart,FaUser,FaStore } from "react-icons/fa";
import { Link } from "react-router-dom";
import './header.css'
import SignIn from "./signIn";
function Header({loginToggle}){
    const [close,setClose]=useState(false)
    return(
        <>
        <div className="header" >
            <nav className="header-nav">
                <div className="nav-leftSide">
                    <Link to='/' style={{textDecoration:"none",color:"inherit"}}><FaStore style={{color:"white"}} className="nav-logo"/></Link>
                </div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/cart">Order</Link></li>
                    <li><Link to='/history'>History</Link></li>
                    <li><Link to='/profile'>Profile</Link></li>
                </ul>
                <div className="nav-rightSide">
                   <Link to='/cart'><FaShoppingCart style={{color:"white"}}  className="nav-cart"/></Link>
                    <FaUser style={{color:"white"}} className="nav-user" onClick={loginToggle}/>
                </div>
            </nav>
        </div>
        </>
    )
}

export default Header;
