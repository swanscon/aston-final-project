import { Col, Container, Nav, Navbar, NavbarBrand, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useAuth from "../context/AuthContext";

export default function MainNav() {
	const { auth } = useAuth();
	const { logout } = useAuth();

	const handleLogout = () => {
		logout();
	};

	return (
		<div style={{ border: "solid red 2px" }}>
			<Navbar>
				<Nav>
					<Container>
						<NavbarBrand>TABLFG</NavbarBrand>
					</Container>
				</Nav>
				<Nav>
					<Container>
						<Row>
							<Col>
								<NavLink to="/">Home</NavLink>
							</Col>
							<Col>
								<NavLink to="/events">My Events</NavLink>
							</Col>
							<Col>
								<NavLink to="/games">Browse Games</NavLink>
							</Col>
							{!auth.token ? (
								<>
									<Col>
										<NavLink to="/login">Login</NavLink>
									</Col>
									<Col>
										<NavLink to="/signup">Signup</NavLink>
									</Col>
								</>
							) : (
								<>
									<Col>
										<NavLink to="#" onClick={handleLogout}>
											Logout
										</NavLink>
									</Col>
								</>
							)}
						</Row>
					</Container>
				</Nav>
			</Navbar>
		</div>
	);
}
