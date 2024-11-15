import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileCard from '../profileCard/ProfileCard';
const ProfileContainer = ({ userId }) => {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Aici se înlocuiește cu endpoint-ul tău specific și se adaugă userId ca un parametru
                const response = await axios.get(`/api/profile/${userId}`);
                setProfileData(response.data);
            } catch (error) {
                setError(error);
                console.error("There was an error fetching the profile data", error);
            }
        };

        if (userId) {
            fetchProfileData();
        }
    }, [userId]); // Dependența [userId] asigură că efectul se re-run când userId se schimbă

    if (error) {
        return <div>There was an error loading the profile data.</div>;
    }

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return <ProfileCard profileData={profileData} />;
};

export default ProfileContainer;
