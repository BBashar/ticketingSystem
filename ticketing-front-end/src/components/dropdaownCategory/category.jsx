// Category.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Category = ({ formData, setFormData }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            subcategory: '', // Reset subcategory when category changes
        });
    };

    return (
        <select id="category" name="category" value={formData.category} onChange={handleChange}>
            <option value="">Selectează categorie</option>
            {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryName}
                </option>
            ))}
        </select>
    );
};

export default Category;
