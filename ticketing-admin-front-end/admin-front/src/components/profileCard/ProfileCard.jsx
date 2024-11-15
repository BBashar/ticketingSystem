import React from 'react';
import './ProfileCard.css';


import { useLogout } from '../../models/useLogout';
//image import
import User_Icon from './../../assets/images/User_Icon.png'
const ProfileCard = ({ name, email, idnp }) => {
    // Assuming the profile data is static as per the image
    const checkDepartment = (status) => {
        switch (parseInt(status)) {
            case 1:
                return 'MAI';
            case 2:
                return 'Primaria';
            case 3:
                return 'Guvern';
            default:
                return '';
        }
    };

    return (
        <div className="profile-card">
            <div className="profile-image">
                {/* Replace with actual image path */}
                <img src={User_Icon} alt="profile_img" />
            </div>
            <div className="profile-info">
                <h2>Nume</h2>
                <p>{name}</p>

                <h2>Email</h2>
                <p>{email}</p>

                <h2>Departament</h2>
                <p>{checkDepartment(idnp)}</p>

                <button onClick={useLogout()}>Delogare</button>

            </div>
        </div>
    );
};

export default ProfileCard;
