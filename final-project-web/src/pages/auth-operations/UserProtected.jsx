import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../context/AuthContext";
import { useEffect } from "react";

export const UserProtected = () => {
	const { auth } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (auth.token === "") {
			navigate("/login");
		}
	}, [auth.token, navigate]);

	return <Outlet />;
};
