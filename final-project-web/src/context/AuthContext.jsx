import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default function useAuth() {
	return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : "",
		token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : "",
		returnUrl: "/",
	});

	const navigate = useNavigate();

	const login = async (username, password) => {
		const response = await fetch("http://localhost:8080/token", {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			const token = await response.text();
            localStorage.setItem('user', JSON.stringify(username));
            localStorage.setItem('token', JSON.stringify(token));
			setAuth({
				user: username,
				token: token,
				returnUrl: auth.returnUrl || "/",
			});
			navigate("/");
		} else {
            throw new Error("Invalid credentials");
        }
	};

	const logout = () => {
		setAuth({
			user: "",
			token: "",
			returnUrl: "/",
		});
        localStorage.removeItem('user');
        localStorage.removeItem('token');
		navigate("/login");
	};

	const value = {
		auth,
		login,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};