import React from "react";
import './MyProfile.css';
import axios from 'axios';
import { useEffect, useState } from "react";
import NotLogged from "../notLogged/notLogged";

//component import
import Navbar from './../../components/navbar'
import ProfileCard from "../../components/profileCard/ProfileCard";
import ProfileContainer from "../../components/cardsContainer/cardsContainer";
import Card from "../../components/card/card";
const MyProfile = () => {

    const [userData, setUserData] = useState({ name: '', email: '', idnp: '' });
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem('userId'); // Asigură-te că 'userId' este corect setat în localStorage

        const fetchUserData = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/myprofile', { userId }); // Ajustează endpoint-ul conform implementării tale
                if (response.data && response.data.userData) {
                    setUserData({
                        name: response.data.userData.firstName, // Ajustează conform structurii tale de date
                        email: response.data.userData.email,
                        idnp: response.data.userData.IDNP,
                    });
                }
            } catch (err) {
                console.error("Eroare la preluarea datelor utilizatorului", err);
            }
        };


        const fetchUserTickets = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/usertickets', { userId }); // Ajustează endpoint-ul conform implementării tale
                if (response.data) {
                    setTickets(response.data); // Presupunem că răspunsul este un array de bilete
                }
            } catch (err) {
                console.error("Eroare la preluarea biletelor utilizatorului", err);
            }
        };

        fetchUserData();
        fetchUserTickets();
    }, []);

    const userId = localStorage.getItem('userId');
    const logged = Boolean(userId);
    const mapStatus = (status) => {
        switch (parseInt(status)) {
            case 1:
                return 'Nou';
            case 2:
                return 'În progres';
            case 3:
                return 'Închis';
            default:
                return '';
        }
    };


    return (
        <div className="MyProfileContainer">
            <Navbar />
            {!logged && (
                <NotLogged />
            )}


            {logged && (
                <div className="loggedMyProfile">
                    <div className="infoSection" >
                        <div className="infoSectionTitle">
                            <h2>Profilul personal</h2>
                        </div>
                        <ProfileCard
                            name={userData.name}
                            email={userData.email}
                            idnp={userData.idnp} />
                    </div>
                    <div className="myTickets">
                        <div className="myTicketsTile">
                            <h2>Tichetele mele</h2>
                        </div>
                        <div className="cardsContainer">
                            {tickets.map((ticket, index) => (
                                <Card
                                    key={index}
                                    ticketNumber={ticket.ticketNumber}
                                    description={ticket.shortDescription}
                                    progress={mapStatus(ticket.progress)}
                                    ticketId={ticket.ticketId} />
                            ))}
                        </div>
                    </div>
                </div>
            )}


        </div>
    )
}

export default MyProfile