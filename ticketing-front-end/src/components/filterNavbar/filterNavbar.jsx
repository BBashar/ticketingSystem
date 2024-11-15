import React, { useState } from "react";
import './filterNavbar.css';
import Category from "../dropdaownCategory/category";
import Subcategory from "../dropdaownCategory/subcategory";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import FilteredPage from "../../pages/FilteredPage/FilteredPage";
import SearchBar from "../seacrhBar/searchBar";
const FilterNavbar = ({ onFilter }) => {
    const [filterData, setFilterData] = useState({
        locality: "",
        category: "",
        subcategory: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilterData({
            ...filterData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const filterResponse = {
            locality: filterData.locality || null,
            category: filterData.category || null,
            subcategory: filterData.subcategory || null
        };
        try {
            console.log(filterResponse);
            const sendingDataAnswer = await axios.post('http://localhost:3000/api/filter', filterResponse);
            if (sendingDataAnswer.status === 200) {
                onFilter(sendingDataAnswer.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleSearch = async (ticketNumber) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/tickets/${ticketNumber}`);
            console.log(response.data);
            onFilter([response.data]);
        } catch (error) {
            console.error('Error fetching ticket:', error);
        }
    };

    const localities = ['City A', 'City B', 'City C'];

    return (
        <form onSubmit={handleSubmit}>
            <nav className="filterContainer">
                <select
                    id="locality"
                    name="locality"
                    value={filterData.locality}
                    onChange={handleInputChange}
                >
                    <option value="">Localitatea</option>
                    {localities.map((locality) => (
                        <option key={locality} value={locality}>
                            {locality}
                        </option>
                    ))}
                </select>
                <Category formData={filterData} setFormData={setFilterData} />
                <Subcategory formData={filterData} setFormData={setFilterData} />
                <SearchBar onSearch={handleSearch} />
                <button type="submit" className="filterSubmit">Submit</button>
            </nav>
        </form>
    );
};

export default FilterNavbar;