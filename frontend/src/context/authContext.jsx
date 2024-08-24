import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = async (formData, role) => {
        let endpoint;
        if (role === "User") {
            endpoint = "http://localhost:8800/api/user/login";
        } else if (role === "Driver") {
            endpoint = "http://localhost:8800/api/driver/login";
        }

        try {
            const res = await axios.post(endpoint, formData, { withCredentials: true });
            setCurrentUser(res.data);
        } catch (error) {
            console.error("Login error:", error);
            setCurrentUser(null); // Handle login errors by resetting user state
        }
    };

    const logout = async (role) => {
        let endpoint;
        if (role === "User") {
            endpoint = "http://localhost:8800/api/user/logout";
        } else if (role === "Driver") {
            endpoint = "http://localhost:8800/api/driver/logout";
        }

        try {
            await axios.post(endpoint, {}, { withCredentials: true });
            setCurrentUser(null);
            localStorage.removeItem("user");
            window.location.reload();
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
