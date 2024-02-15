import { Nav, Navbar } from "react-bootstrap"
import { NavLink } from "react-router-dom"

export default function MainFooter() {
    return (
        <div style={{border: 'solid green 2px'}}>
            <Navbar>
                <Nav>
                    <NavLink to="/">TABLFG</NavLink>

                    <NavLink to="/admin">Admin</NavLink>
                </Nav>
            </Navbar>
        </div>
    )
}