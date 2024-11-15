import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userToken'); // Consider also removing the token
        navigate('/'); // Assuming you have a route setup for '/login'
    };

    return logout;
}
