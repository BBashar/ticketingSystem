import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.css'; // Importați fișierul CSS pentru stilizare
import Navbar from '../../components/navbar/navbar';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('No userId found in local storage');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:3000/api/getUsers/${userId}`);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users data:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <Navbar />
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
