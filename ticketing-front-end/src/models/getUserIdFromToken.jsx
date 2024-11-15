// Assuming the jwt-decode package is installed
import { jwtDecode } from "jwt-decode";

export const getUserIdFromToken = (token) => {
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        localStorage.setItem('userId', decoded.userId);
        return decoded.userId;
    } catch (error) {
        console.error("Failed to decode token", error);
        return null;
    }
};
