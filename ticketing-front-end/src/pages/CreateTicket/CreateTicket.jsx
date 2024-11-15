import React from "react";
import './CreateTicket.css'
import Navbar from "../../components/navbar";
import TicketForm from "../../components/TicketForm/TicketForm";
import Footer from "../../components/footer/footer";
import NotLogged from "../notLogged/notLogged";
//test
import FilterNavbar from "../../components/filterNavbar/filterNavbar";
const CreateTicket = () => {

    const userId = localStorage.getItem('userId');
    const logged = Boolean(userId);
    return (
        <div className="createTicketPageContainer">
            <Navbar />
            <div className="showTickets">

            </div>
            {/* if is logged */}
            {logged && (
                <TicketForm />
            )}
            {!logged && (
                <NotLogged />
            )}


            <Footer />
        </div>
    );
}

export default CreateTicket;