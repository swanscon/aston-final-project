import { Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useAuth from "../context/AuthContext";

export default function MainNav() {
	const { auth } = useAuth();
	const { logout } = useAuth();

	const handleLogout = () => {
		logout();
	};

	return (
		<Navbar className="navbar-custom">
			<Container>
				<NavbarBrand>
					<NavLink className="nav-link" to="/">
						TABLFG
					</NavLink>
				</NavbarBrand>
				<Nav className="ml-auto">
					<NavLink className="nav-link" to="/">
						Home
					</NavLink>

					{!auth.token ? (
						<></>
					) : (
						<NavLink className="nav-link" to="/events">
							My Events
						</NavLink>
					)}

					<NavLink className="nav-link" to="/games">
						Browse Games
					</NavLink>

					{!auth.token ? (
						<>
							<NavLink className="nav-link" to="/login">
								Login
							</NavLink>

							<NavLink className="nav-link" to="/signup">
								Signup
							</NavLink>
						</>
					) : (
						<NavLink className="nav-link" onClick={handleLogout}>
							Logout
						</NavLink>
					)}
				</Nav>
			</Container>
		</Navbar>
	);
}
