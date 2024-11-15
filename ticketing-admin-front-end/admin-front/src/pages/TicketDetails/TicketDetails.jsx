import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './TicketDetails.css'; // Importing CSS file for styling
import axios from 'axios';
import Navbar from '../../components/navbar/navbar';
import Category from '../../components/dropdaownCategory/category';
import Subcategory from '../../components/dropdaownCategory/subcategory';
import Department from '../../components/Details/departments';
const TicketDetails = () => {
    const { ticketId } = useParams();
    const [ticketDetails, setTicketDetails] = useState({});
    const [formData, setFormData] = useState({}); // State for form data
    const [assignedToMe, setAssignedToMe] = useState(false); // State for assignment status
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/ticket/${ticketId}`);
                if (response.data) {
                    setTicketDetails(response.data[0]);
                    setFormData(response.data[0]); // Initialize form data
                }
            } catch (err) {
                console.error("Eroare la preluarea datelor utilizatorului", err);
            }
        }
        fetchDetails();
    }, [ticketId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); // Update form data on change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/api/ticket/${ticketId}`, formData);
            console.log("Update successful:", response.data);
        } catch (err) {
            console.error("Eroare la actualizarea biletului", err);
        }
    };
    const handleAssignToMe = async () => {
        try {
            const adminId = localStorage.getItem('userId');
            const response = await axios.put(`http://localhost:3000/api/assigned-to-me/${ticketId}`, { adminId: adminId });
            console.log("Update successful:", response.data);
        } catch (err) {
            console.error("Eroare la actualizarea biletului", err);
        }
        setAssignedToMe(true);
    };

    if (!ticketDetails) return <div>Loading...</div>;

    return (
        <div className="detailsContainer">
            <Navbar />
            <div className="ticketDetails">
                <h1>Detalii Tichet</h1>
                <form onSubmit={handleSubmit}>
                    <div className="detail">
                        <label>Numărul Tichetului:</label>
                        <input type="text" name="ticketNumber" value={formData.ticketNumber || ''} onChange={handleChange} readOnly />
                    </div>
                    <div className="detail">
                        <label>Categoria:</label>
                        {/* <input type="text" name="categoryName" value={formData.categoryName || <Category />} onChange={handleChange} /> */}
                        <Category formData={formData} setFormData={setFormData} />
                    </div>
                    <div className="detail">
                        <label>Subcategoria:</label>
                        {/* <input type="text" name="subcategoryName" value={formData.subcategoryName || ''} onChange={handleChange} /> */}
                        <Subcategory formData={formData} setFormData={setFormData} />
                    </div>
                    <div className="detail">
                        <label>Departament:</label>
                        {/* <input type="text" name="departmentName" value={formData.departmentName || ''} onChange={handleChange} /> */}
                        <Department formData={formData} setFormData={setFormData} />

                    </div>

                    <div className="detail">
                        <label>Descrierea scurtă:</label>
                        <input type="text" name="shortDescription" value={formData.shortDescription || ''} onChange={handleChange} />
                    </div>
                    <div className="detail description">
                        <label>Descrierea:</label>
                        <textarea name="description" value={formData.description || ''} onChange={handleChange} />
                    </div>
                    <div className="detail">
                        <label>Localitatea:</label>
                        <input type="text" name="locality" value={formData.locality || ''} onChange={handleChange} />
                    </div>
                    <div className="detail">
                        <label>Progres:</label>
                        <input type="text" name="progress" value={formData.progress || ''} onChange={handleChange} />
                    </div>
                    <div className="detail">
                        <label>Notițe:</label>
                        <input type="text" name="assignmentGroup" value={formData.notite || ''} onChange={handleChange} />
                    </div>
                    <div className="detail">
                        <label>Asignează mie:</label>
                        {assignedToMe ? (
                            <span>Assigned</span>
                        ) : (
                            <button type="button" onClick={handleAssignToMe}>Asignează mie</button>
                        )}
                    </div>
                    {/* Add more fields here if needed */}
                    <button type="submit">Actualizare</button>
                </form>
            </div>
        </div>
    );
};

export default TicketDetails;
