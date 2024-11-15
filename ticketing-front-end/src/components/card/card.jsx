import React from 'react';
import { useNavigate } from 'react-router-dom';
import './card.css';

const Card = ({ ticketNumber, description, progress, ticketId }) => {
    const navigate = useNavigate();
    //when we press button of the details, takes us to to detials page : logic is present in TicketDetails
    const handleViewDetails = () => {
        console.log(ticketId);
        navigate(`/ticket/${ticketId}`);

    };

    return (
        <div className="cardContainer">
            <div className="ticketNumber">
                <h2>{ticketNumber}</h2>
            </div>
            <div className="cardShortDescription">
                <p>{description}</p>
            </div>
            <div className="progressTicket">
                <p>Stare: {progress}</p>
            </div>
            <div className="cardViewMore">
                <button onClick={handleViewDetails} className="viewTicket">Detalii</button>
            </div>
        </div>
    );
};

export default Card;
