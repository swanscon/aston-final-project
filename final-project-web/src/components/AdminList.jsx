import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function AdminList() {
    return (
        <>
            <ListGroup>
                <ListGroup.Item>
                    <b>Game Service</b>
                    <ListGroup>
                        <ListGroup.Item>
                            <NavLink to="/admin/game">Game</NavLink>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <NavLink to="/admin/gameType">Game Type</NavLink>
                        </ListGroup.Item>
                    </ListGroup>
                </ListGroup.Item>
                <ListGroup.Item>
                    <b>Event Service</b>
                    <ListGroup>
                        <ListGroup.Item>
                            <NavLink to="#">Event</NavLink>
                        </ListGroup.Item>
                    </ListGroup>
                </ListGroup.Item>
                <ListGroup.Item>
                    <b>Attendee Service</b>
                    <ListGroup>
                        <ListGroup.Item>
                            <NavLink to="#">Attendee</NavLink>
                        </ListGroup.Item>
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </>
    );
}
