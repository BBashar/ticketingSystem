import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './TicketDetails.css'; // Importing CSS file for styling
import axios from 'axios';
import Navbar from '../../components/navbar';

const TicketDetails = () => {
    const { ticketId } = useParams();
    const [ticketDetails, setTicketDetails] = useState({});

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/ticket/${ticketId}`);
                if (response.data) {

                    setTicketDetails(response.data[0]);
                    console.log(ticketDetails.category);

                }

            } catch (err) {
                console.error("Eroare la preluarea datelor utilizatorului", err);
            }
        }
        fetchDetails();
    }, [ticketId]);

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
    if (!ticketDetails) return <div>Loading...</div>;

    return (
        <div className="detailsContainer">
            <Navbar />
            <div className="ticketDetails">
                <h1>Detalii Tichet</h1>
                <div className="detail">
                    <label>Categoria:</label>
                    <input type="text" value={ticketDetails.categoryName || ''} readOnly />
                </div>
                <div className="detail">
                    <label>Subcategoria:</label>
                    <input type="text" value={ticketDetails.subcategoryName || ''} readOnly />
                </div>
                <div className="detail">
                    <label>Departament:</label>
                    <input type="text" value={ticketDetails.departmentName || ''} readOnly />
                </div>
                <div className="detail">
                    <label>Numar Tichet:</label>
                    <input type="text" value={ticketDetails.ticketNumber || ''} readOnly />
                </div>
                <div className="detail">
                    <label>Descriere scurtă:</label>
                    <input type="text" value={ticketDetails.shortDescription || ''} readOnly />
                </div>
                <div className="detail description">
                    <label>Descriere:</label>
                    <textarea value={ticketDetails.description || ''} readOnly />
                </div>
                <div className="detail">
                    <label>Localitatea:</label>
                    <input type="text" value={ticketDetails.locality || ''} readOnly />
                </div>
                <div className="detail">
                    <label>Progres:</label>
                    <input type="text" value={mapStatus(ticketDetails.progress) || ''} readOnly />
                </div>
                <div className="detail">
                    <label>Notite:</label>
                    <input type="text" value={ticketDetails.assignmentGroup || ''} readOnly />
                </div>

            </div>

        </div>

    );
};

export default TicketDetails;
