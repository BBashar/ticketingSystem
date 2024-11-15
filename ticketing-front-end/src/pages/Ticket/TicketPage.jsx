import React, { useEffect, useState } from "react";
import './Ticket.css';
import axios from 'axios';
import Navbar from "../../components/navbar";
import FilterNavbar from "../../components/filterNavbar/filterNavbar";
import Footer from "../../components/footer/footer";
import Card from "../../components/card/card";

const TicketPage = () => {
    const [ticketData, setTicketData] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);

    useEffect(() => {
        const fetchUserTickets = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/getAllTickets');
                if (response.data) {
                    setTicketData(response.data);
                    setFilteredTickets(response.data); // Initialize filteredTickets with all tickets
                }
            } catch (err) {
                console.error("Error fetching user tickets", err);
            }
        };
        fetchUserTickets();
    }, []);

    const handleFilter = (data) => {
        setFilteredTickets(data);
    };

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
        <div className="ticketPageContainer">
            <Navbar />
            <FilterNavbar onFilter={handleFilter} />
            <div className="tickets">
                <div className="cards">
                    {filteredTickets.map((ticket, index) => (
                        <Card
                            key={index}
                            ticketNumber={ticket.ticketNumber}
                            description={ticket.shortDescription}
                            progress={mapStatus(ticket.progress)}
                            ticketId={ticket.ticketId}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TicketPage;
