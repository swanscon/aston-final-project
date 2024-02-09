import { Nav, Navbar, NavbarBrand } from "react-bootstrap"
import { NavLink } from "react-router-dom"

export default function MainNav() {
    return (
        <div style={{border: 'solid red 2px'}}>
            <Navbar>
                <Nav>
                    <NavbarBrand>
                        TABLFG
                    </NavbarBrand>
                </Nav>
                <Nav>
                    <NavLink to="/">Home</NavLink>

                    <NavLink to="/events">My Events</NavLink>

                    <NavLink to="/games">Browse Games</NavLink>
                </Nav>
            </Navbar>
        </div>
    )
}