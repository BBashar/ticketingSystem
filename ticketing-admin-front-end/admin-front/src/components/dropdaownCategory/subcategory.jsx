// Category.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Subcategory = ({ formData, setFormData }) => {
    const [subcategories, setSubcategories] = useState([]);

    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/subcategories');
                setSubcategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchSubcategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <select id="subcategory" name="subcategory" value={formData.subcategory} onChange={handleChange}>
            <option value="">Select subcategory</option>
            {subcategories.map((subcategory) => (
                <option key={subcategory.subCategoryId} value={subcategory.subCategoryId}>
                    {subcategory.subCategoryName}
                </option>
            ))}
        </select>
    );
};

export default Subcategory;
