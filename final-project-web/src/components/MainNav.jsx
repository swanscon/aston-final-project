import { Col, Container, Nav, Navbar, NavbarBrand, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function MainNav() {
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
						</Row>
					</Container>
				</Nav>
			</Navbar>
		</div>
	);
}
