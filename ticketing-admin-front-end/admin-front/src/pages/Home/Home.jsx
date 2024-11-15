import React from "react"
import Navbar from "../../components/navbar/navbar";
import axios from 'axios';
import { useEffect, useState } from "react";
import Card from "../../components/navbar/card/card";
import { Link } from "react-router-dom";
import './Home.css'
const Home = () => {
    const [homeTickets, setHomeTickets] = useState([]);
    useEffect(() => {
        const fetchUserTickets = async () => {

            try {
                const response = await axios.get('http://localhost:3000/api/homeTickets');
                if (response.data) {
                    setHomeTickets(response.data);
                }
            } catch (err) {
                console.error("Eroare la preluarea datelor utilizatorului", err);
            }
        };
        fetchUserTickets();
    }, []);
    return (
        <div className="homeContainer" >
            <Navbar />
            <div className="categories">
                <Link to="/all" className="categoryLink">
                    <div className="category">Toate Tichetele </div>
                </Link>
                <Link to="/new" className="categoryLink">
                    <div className="category">Tichete Neasignate</div>
                </Link>
                <Link to="/assigned" className="categoryLink">
                    <div className="category">Tichete Atribuite Mie</div>
                </Link>
                <Link to="/users" className="categoryLink">
                    <div className="category">Utilizatori</div>
                </Link>
            </div>
        </div >
    );
}


export default Home;