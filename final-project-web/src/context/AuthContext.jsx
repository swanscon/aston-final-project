import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export default function useAuth() {
	return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		id: 0,
		user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
		token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : "",
		role: "",
	});

	useEffect(() => {
		if (auth.token) {
			const decoded = jwtDecode(auth.token);

			setAuth((prevAuth) => ({
				...prevAuth,
				id: decoded.id,
				user: decoded.sub,
				role: decoded.roles,
			}));
		}
	}, [auth.token]);

	const login = async (username, password) => {
		try {
			const response = await fetch("http://localhost:8185/api/user/login", {
				method: "POST",
				body: JSON.stringify({ username, password }),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.ok) {
				const { token } = await response.json();
				localStorage.setItem("user", JSON.stringify(username));
				localStorage.setItem("token", JSON.stringify(token));
				setAuth({
					user: username,
					token: token,
					role: jwtDecode(token).role,
				});
			} else {
				throw new Error("Invalid email or password");
			}
		} catch (error) {
			console.error("Login error: ", error);
		}
	};

	const signup = async (username, password) => {
		try {
			const response = await fetch("http://localhost:8185/api/user/signup", {
				method: "POST",
				body: JSON.stringify({ username, password }),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.ok) {
				const { token } = await response.json();
				localStorage.setItem("user", JSON.stringify(username));
				localStorage.setItem("token", JSON.stringify(token));
				setAuth({
					user: username,
					token: token,
					role: jwtDecode(token).role,
				});
			} else {
				throw new Error("Signup failed");
			}
		} catch (error) {
			console.error("Signup error: ", error);
		}
	};

	const logout = () => {
		localStorage.clear();
		setAuth({
			id: 0,
			user: null,
			token: "",
			role: "",
		});
	};

	const value = { auth, login, signup, logout };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
