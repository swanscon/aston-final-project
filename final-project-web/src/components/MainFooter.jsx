import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useAuth from "../context/AuthContext";

export default function MainFooter() {
	const { auth } = useAuth();

	return (
		<Navbar className="footer-custom">
			<Container>
				<Nav className="m-auto">
					<NavLink className="nav-link" to="/">
						TABLFG
					</NavLink>
					{auth.token && auth.role?.[0] === "ROLE_ADMIN" && (
						<NavLink className="nav-link" to="/admin">
							Admin
						</NavLink>
					)}
				</Nav>
			</Container>
		</Navbar>
	);
}
