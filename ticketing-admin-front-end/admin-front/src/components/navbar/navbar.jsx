import React, { useState } from "react";
import "./navbar.css";
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";
import { useEffect } from "react";


const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);


    return (
        <nav>
            <Link to="/" className="title">
                Admin
            </Link>
            <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""}>
                <li>
                    <NavLink to="/">Tichete</NavLink>   </li>
                <li>
                    <NavLink to="/assigned">Asignate</NavLink>
                </li>
                <li>
                    <NavLink to="/create-ticket">Creare Tichet</NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard">Analitica</NavLink>
                </li>
                <li>
                    <NavLink to="/adminprofile">Profilul meu</NavLink>
                </li>
            </ul>
        </nav>
    )
};



export default Navbar