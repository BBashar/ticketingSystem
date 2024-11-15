import React, { useState, useEffect } from "react";
import "./navbar.css";
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const loadChatToServiceNow = async () => {
            if (!window.ServiceNowChat) { // Check if ServiceNowChat is not already loaded
                const script = document.createElement('script');
                script.src = "https://gaiadev.service-now.com/scripts/now-requestor-chat-popover-app/now-requestor-chat-popover-app.min.js?sysparm_substitute=false";
                script.type = 'module';
                script.async = true;
                script.onload = () => {
                    if (window.ServiceNowChat) { // Check if the script loaded successfully
                        new window.ServiceNowChat({
                            instance: 'https://gaiadev.service-now.com'
                        });
                    }
                };
                document.body.appendChild(script);
            }
        };

        loadChatToServiceNow();
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <nav>
            <Link to="/" className="title">Ticketing</Link>
            <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""}>
                <li><NavLink to="/">Despre</NavLink></li>
                <li><NavLink to="/ticket-page">Tichete</NavLink></li>
                <li><NavLink to="/create-ticket">Creare Tichet</NavLink></li>
                <li><NavLink to="/myprofile">Profilul meu</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navbar;
