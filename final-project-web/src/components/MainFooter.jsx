import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useAuth from "../context/AuthContext";

export default function MainFooter() {
	const { auth } = useAuth();

	return (
		<div style={{ border: "solid green 2px" }}>
			<Navbar>
				<Nav>
					<NavLink to="/">TABLFG</NavLink>
					{!auth.token || auth.role[0] !== "ROLE_ADMIN" ? (
						<></>
					) : (
						<NavLink to="/admin">Admin</NavLink>
					)}
				</Nav>
			</Navbar>
		</div>
	);
}
