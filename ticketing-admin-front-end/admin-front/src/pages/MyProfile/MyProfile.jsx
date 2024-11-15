import React from "react";
import './MyProfile.css';
import axios from 'axios';
import { useEffect, useState } from "react";

//component import
import Navbar from "../../components/navbar/navbar";
import ProfileCard from "../../components/profileCard/ProfileCard";
import Card from "../../components/navbar/card/card";
const MyProfile = () => {

    const [adminData, setAdminData] = useState({ name: '', email: '', idnp: '' });
    const [adminTickets, setAdminTickets] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem('userId'); // Asigură-te că 'userId' este corect setat în localStorage

        const fetchUserData = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/admindetails', { userId }); // Ajustează endpoint-ul conform implementării tale
                if (response.data && response.data.userData) {
                    setAdminData({
                        name: response.data.userData.firstName, // Ajustează conform structurii tale de date
                        email: response.data.userData.email,
                        idnp: response.data.userData.department,
                    });
                }
            } catch (err) {
                console.error("Eroare la preluarea datelor utilizatorului", err);
            }
        };

        const fetchUserTickets = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/assigned', {
                    params: {
                        user: user
                    }
                });
                if (response.data) {
                    setAdminTickets(response.data); // Presupunem că răspunsul este un array de bilete
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


    return (
        <div className="MyProfileContainer">
            <Navbar />




            <div className="loggedMyProfile">
                <div className="infoSection" >
                    <div className="infoSectionTitle">
                        <h2>Profilul personal</h2>
                    </div>
                    <ProfileCard
                        name={adminData.name}
                        email={adminData.email}
                        idnp={adminData.idnp} />
                </div>
                {/* <div className="myTickets">
                    <div className="myTicketsTile">
                        <h2>Tichetele mele</h2>
                    </div>
                    <div className="cardsContainer">
                        {adminTickets.map((ticket, index) => (
                            <Card
                                key={index}
                                ticketNumber={ticket.ticketNumber}
                                description={ticket.shortDescription}
                                ticketId={ticket.ticketId} />
                        ))}
                    </div>
                </div> */}
            </div>



        </div>
    )
}

export default MyProfile