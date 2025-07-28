import React, { useState } from "react";
import { FaShoppingCart, FaUser, FaStore, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import './header.css';

function Header({ loginToggle }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <div className="header">
                <nav className="header-nav">

                    <div className="nav-leftSide">
                        <div className="toggle" onClick={toggleMenu}>
                            {menuOpen ? <FaTimes /> : <FaBars />}
                        </div>
                        <Link to='/' className="nav-logo">
                            <FaStore />
                        </Link>
                    </div>

                    {/* Responsive Nav Menu */}
                    <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
                        <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                        <li><Link to="/cart" onClick={toggleMenu}>Order</Link></li>
                        <li><Link to="/history" onClick={toggleMenu}>History</Link></li>
                        <li><Link to="/profile" onClick={toggleMenu}>Profile</Link></li>
                    </ul>

                    {/* Right Side */}
                    <div className="nav-rightSide">
                        <Link to='/cart'>
                            <FaShoppingCart className="nav-cart" />
                        </Link>
                        <FaUser className="nav-user" onClick={loginToggle} />
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Header;
