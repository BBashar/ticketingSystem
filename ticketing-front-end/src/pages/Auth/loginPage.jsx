import React from "react"
import './loginPage.css'
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { getUserIdFromToken } from "../../models/getUserIdFromToken";




const LoginPage = () => {
    const navigate = useNavigate();

    const [loginResponse, setLoginResponse] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginResponse(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        // Salvarea datelor în obiectul LoginResponse
        const LoginResponse = {
            email: loginResponse.email,
            password: loginResponse.password
        };

        try {

            const sendingDataAnswer = await axios.post('http://localhost:3000/api/login', LoginResponse).then(response => {
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
            console.log("Datele pentru autentificare trimise către backend:", LoginResponse);

            setLoginResponse({
                email: "",
                password: ""
            });
        }


    };




    return (
        <div className="auth-body">
            <div className="container">
                <div className="header">
                    <div className="text">Login</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        {/* <img src={email_icon} alt="" className="authImg" /> */}
                        <input
                            type="email"
                            placeholder="Your email.."
                            value={loginResponse.email}
                            onChange={handleInputChange}
                            name="email"

                        />
                    </div>
                    <div className="input" >
                        {/* <img src={password_icon} alt="" className="authImg" /> */}
                        <input
                            type="password"
                            placeholder="Password"
                            value={loginResponse.password}
                            onChange={handleInputChange}
                            name="password"

                        />
                    </div>
                </div>
                <div className="forgot-password">Lost Password? <span>Click here</span></div>
                <div className="submit-container">
                    <button className="submit" onClick={handleSubmit}>Login</button>

                </div>
            </div>
        </div>



    );
}

export default LoginPage