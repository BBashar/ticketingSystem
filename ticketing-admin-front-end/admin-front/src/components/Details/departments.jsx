import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Department = ({ formData, setFormData }) => {
    const [departments, setDepartment] = useState([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/departments');
                setDepartment(response.data);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchDepartments();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    return (
        <select id="department" name="department" value={formData.department} onChange={handleChange}>
            <option value="">Selecteaza departmentul</option>
            {departments.map((department) => (
                <option key={department.departmentId} value={department.departmentId}>
                    {department.departmentName}
                </option>
            ))}
        </select>
    );
}

export default Department;