import React from "react";
import { useState } from "react";
import './TicketForm.css'
import axios from "axios";

//test
import Category from "../dropdaownCategory/category";
import Subcategory from "../dropdaownCategory/subcategory";
import { Token } from "@mui/icons-material";

const TicketForm = () => {
    const localities = ['City A', 'City B', 'City C'];

    const token = localStorage.getItem('userToken');





    const [formData, setFormData] = useState({
        shortDescription: "",
        description: "",
        userEmail: "",
        userPhone: "",
        category: "",
        subcategory: "",
        locality: "",
        anonym: false,
        attachment: ""

    });


    //handle the changes:
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.checked,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            attachment: e.target.files[0],
        });
    };



    const handleSubmit = async (e) => {

        e.preventDefault();
        const { shortDescription, description, userEmail, userPhone, category, subcategory, locality } = formData;
        if (!shortDescription || !description || !userEmail || !userPhone || !category || !subcategory || !locality) {
            // Alert or display a message to the user that all fields are required
            console.log("Please fill in all fields.");
            return; // Prevent the submission if not all fields are filled
        }

        const FormResponse = {
            shortDescription: formData.shortDescription,
            description: formData.description,
            userEmail: formData.userEmail,
            userPhone: formData.userPhone,
            category: formData.category,
            subcategory: formData.subcategory,
            locality: formData.locality,
            anonym: false,
            attachment: "",
            userId: localStorage.getItem('userId')
        }
        try {

            const sendingDataAnswer = await axios.post('http://localhost:3000/api/create-ticket', FormResponse);
            if (sendingDataAnswer.status == 200) {
                setFormData({
                    shortDescription: "",
                    description: "",
                    userEmail: "",
                    userPhone: "",
                    category: "",
                    subcategory: "",
                    locality: "",
                    anonym: false,
                    attachment: ""
                });
            }

        } catch (err) {
            console.log(`an error occured duting creating ticket err:${err}`);

        }
    };
    const isValidPhoneNumber = (input) => {
        // Expresie regulată pentru a verifica dacă inputul conține doar cifre
        const numberPattern = /^\d+$/;
        return numberPattern.test(input);
    };


    return (
        <div className="TicketFormContainer">
            <form onSubmit={handleSubmit}>
                <label htmlFor="shortDescription">Descriere scurtă:</label>
                <input
                    type="text"
                    id="shortDescription"
                    name="shortDescription"
                    placeholder="Descriere scurtă"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                />

                <label htmlFor="description">Descriere:</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Descriere"
                    value={formData.description}
                    onChange={handleInputChange}
                />

                <label htmlFor="userEmail">Email:</label>
                <input
                    type="email"
                    id="userEmail"
                    name="userEmail"
                    placeholder=" Email"
                    value={formData.userEmail}
                    onChange={handleInputChange}
                />

                <label htmlFor="userPhone">Număr telefon:</label>
                <input
                    type="tel"
                    id="userPhone"
                    name="userPhone"
                    placeholder="Număr telefon"
                    value={formData.userPhone}
                    onChange={handleInputChange}
                    className={!isValidPhoneNumber(formData.userPhone) ? 'input-red' : ''}
                />

                <label htmlFor="category">Categorie:</label>
                <Category
                    formData={formData}
                    setFormData={setFormData}
                />
                <Subcategory
                    formData={formData}
                    setFormData={setFormData} />

                <label htmlFor="locality">Localitatea:</label>
                <select
                    id="locality"
                    name="locality"
                    value={formData.locality}
                    onChange={handleInputChange}
                >
                    <option value="">Selectează localitatea</option>
                    {localities.map((locality) => (
                        <option key={locality} value={locality}>
                            {locality}
                        </option>
                    ))}
                </select>

                <label htmlFor="anonym">
                    Anonim:
                    <input
                        type="checkbox"
                        id="anonym"
                        name="anonym"
                        checked={formData.anonym}
                        onChange={handleCheckboxChange}
                    />
                </label>

                <label htmlFor="attachment">Atașamente:</label>
                <input
                    type="file"
                    id="attachment"
                    name="attachment"
                    onChange={handleFileChange}
                />

                <button type="submit" className="ticketSubmit">Submit</button>
            </form>
        </div>
    )
}

export default TicketForm;