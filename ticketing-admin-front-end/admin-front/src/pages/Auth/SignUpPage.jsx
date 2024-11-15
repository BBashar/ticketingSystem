import React from "react"
import './loginPage.css'
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { getUserIdFromToken } from "../../models/getUserIdFromToken";

const SignUpPage = () => {
    const navigate = useNavigate();
    const [signupResponse, setSignupResponse] = useState({

        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSignupResponse(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        const signupResponseData = {

            firstName: signupResponse.firstName,
            lastName: signupResponse.lastName,
            email: signupResponse.email,
            password: signupResponse.password
        };


        try {

            const sendingDataAnswer = await axios.post('http://localhost:3000/api/admin-auth', signupResponseData).then(response => {
                const token = response.data.token;
                localStorage.setItem('userToken', token);
                const user = getUserIdFromToken(token);
                if (response.status === 200) {
                    navigate('/');
                }
            })
                .catch(error => {
                    console.error('There was an error!', error);
                    // Handle error here, perhaps set an error message in state and show it to the user
                });

            console.log(`answer ${sendingDataAnswer}`);

        } catch {
            console.log("Datele pentru autentificare trimise către backend:", signupResponseData);

            setSignupResponse({
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            });
        }


    };

    const getUserIdFromToken = (token) => {

        if (!token) return null;


        try {
            const decoded = jwtDecode(token);
            let save = localStorage.setItem('userId', decoded.userId);
            return decoded.userId;
        } catch (error) {
            console.error("Failed to decode token", error);
            return null;
        }
    };

    return (
        <div className="auth-body">
            <div className="container">
                <div className="header">
                    <div className="text">Sign Up</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        {/* <img src={user_icon} alt="" className="authImg" /> */}
                        <input
                            type="text"
                            placeholder="FirstName.."
                            value={signupResponse.firstName}
                            onChange={handleInputChange}
                            name="firstName" />
                    </div>
                    <div className="input">
                        {/* <img src={user_icon} alt="" className="authImg" /> */}
                        <input
                            type="text"
                            placeholder="LastName.."
                            value={signupResponse.lastName}
                            onChange={handleInputChange}
                            name="lastName" />
                    </div>
                    <div className="input">
                        {/* <img src={email_icon} alt="" className="authImg" /> */}
                        <input
                            type="email"
                            placeholder="Your email.."
                            value={signupResponse.email}
                            onChange={handleInputChange}
                            name="email" />

                    </div>
                    <div className="input">
                        {/* <img src={password_icon} alt="" /> */}
                        <input
                            type="password"
                            placeholder="Password"
                            value={signupResponse.password}
                            onChange={handleInputChange}
                            name="password" />
                    </div>
                </div>
                {/* <div className="forgot-password">Lost Password? <span>Click here</span></div> */}
                <div className="submit-container">
                    <button className="submit" onClick={handleSubmit}>Sign Up</button>
                </div>
            </div>
        </div>

    );
}

export default SignUpPage