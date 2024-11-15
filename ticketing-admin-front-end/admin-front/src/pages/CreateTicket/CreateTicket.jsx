import React from "react";
import './CreateTicket.css'
import Navbar from "../../components/navbar/navbar";
import TicketForm from "../../components/TicketForm/TicketForm";
const CreateTicket = () => {

    const userId = localStorage.getItem('userId');
    const logged = Boolean(userId);
    return (
        <div className="createTicketPageContainer">
            <Navbar />
            <div className="showTickets">
                <TicketForm />

            </div>



        </div>
    );
}

export default CreateTicket;