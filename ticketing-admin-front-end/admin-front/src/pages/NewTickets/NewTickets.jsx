import react from 'react';
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Card from "../../components/navbar/card/card";
import axios from 'axios';

const NewTickets = () => {
    const [ticketData, setTicketData] = useState([]);
    useEffect(() => {
        const fetchUserTickets = async () => {

            try {
                const user = localStorage.getItem('userId');
                console.log(user);
                const response = await axios.get('http://localhost:3000/api/new', {
                    params: {
                        user: user
                    }
                });
                if (response.data) {
                    setTicketData(response.data);
                }
            } catch (err) {
                console.error("Eroare la preluarea datelor utilizatorului", err);
            }
        };
        fetchUserTickets();
    }, []);

    return (
        <div className="allTicketsContainer">
            <Navbar />
            <div className="tickets">
                <div className="cards">
                    {ticketData.map((ticket, index) => (
                        <Card
                            key={index}
                            ticketNumber={ticket.ticketNumber}
                            description={ticket.shortDescription}
                            ticketId={ticket.ticketId} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NewTickets;