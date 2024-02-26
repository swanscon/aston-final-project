import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../context/AuthContext";
import { useEffect } from "react";

export const AdminProtected = () => {
	const { auth } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (auth.token === "" || auth.role[0] === "ROLE_USER") {
			navigate("/");
		}
	}, [auth.token, auth.role, navigate]);

	return <Outlet />;
};
