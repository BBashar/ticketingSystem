import React from "react";
import { Link } from "react-router-dom"; // Make sure to import Link
import './notLogged.css';

const NotLogged = () => {
    return (
        <div className="notLoggedContainer">
            <div className="boxNotLogged">
                <div className="notLoggedInfo">
                    <p>Please log in to get access to create tickets and see your tickets.</p>
                </div>
                <div className="access">
                    {/* Sign Up Button */}
                    <Link to="/sign-up-local" className="signUpButton">Sign Up</Link>
                    {/* Login Button */}
                    <Link to="/login" className="loginButton">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default NotLogged;
