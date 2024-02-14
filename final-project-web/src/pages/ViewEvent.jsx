import { useParams, NavLink, useNavigate } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import MainNav from "../components/MainNav";
import { useState, useEffect } from "react";
import MainFooter from "../components/MainFooter";

export default function ViewEvent() {
    let { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [event, setEvent] = useState(null);
    const [game, setGame] = useState(null);
    const [attendees, setAttendees] = useState([]);
    const [confirmButtonShow, setConfirmButtonShow] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        const fetchEvent = fetch(`http://localhost:8182/api/event/${id}`).then(
            (response) => {
                if (!response.ok)
                    throw new Error("Event could not be fetched!");
                return response.json();
            }
        );

        fetchEvent
            .then((eventData) => {
                const gameId = eventData.gameId;
                return fetch(`http://localhost:8181/api/game/${gameId}`)
                    .then((response) => {
                        if (!response.ok)
                            throw new Error("Game could not be fetched!");
                        return response.json();
                    })
                    .then((gameData) => {
                        setGame(gameData);
                        return eventData;
                    });
            })
            .then((eventData) => {
                return fetch(`http://localhost:8183/api/attendee/event/${id}`)
                    .then((response) => response.json())
                    .then((attendeesData) => {
                        const loadedAttendees = Object.keys(attendeesData).map(
                            (key) => ({
                                id: key,
                                ...attendeesData[key],
                            })
                        );
                        setAttendees(loadedAttendees);
                        return eventData;
                    });
            })
            .then((eventData) => {
                setEvent(eventData);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    }, [id]);

    const handleConfirmButton = () => {
        setConfirmButtonShow(!confirmButtonShow);
    };

    const handleDelete = async () => {
        if (deleted) {
            alert("Event not found.");
        } else {
            try {
                // Delete event
                const eventResponse = await fetch(
                    `http://localhost:8182/api/event/${event.id}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (!eventResponse.ok) {
                    throw new Error("Failed to delete the event");
                }
				// eslint-disable-next-line
                const eventData = eventResponse; // For Logging

                // Delete attendees
                for (const attendee of attendees) {
                    const deleteResponse = await fetch(
                        `http://localhost:8183/api/attendee/${attendee.id}`,
                        {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    if (!deleteResponse.ok) {
                        throw new Error("Failed to delete the attendee");
                    }
					// eslint-disable-next-line
                    const deleteData = deleteResponse; // For Logging
                }
            } catch (error) {
                console.error("Failed to update event and attendees", error);
            }
            setDeleted(false);
            navigate("/events");
        }
    };

    const handleStatusColor = (status) => {
        if (status === "Accepted") {
            return "green";
        } else if (status === "Declined") {
            return "red";
        } else {
            return "gold";
        }
    };

    const eventDisplay = () => {
        if (isLoading) {
            return <>Loading...</>;
        } else {
            return (
                <div>
                    <Card
                        style={{
                            width: "18rem",
                            margin: "auto",
                            marginTop: "20px",
                        }}
                    >
                        <Card.Body>
                            <Card.Title>{event.name}</Card.Title>
                            <Card.Subtitle>Game: {game.name}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">
                                Event Date:{" "}
                                {new Date(event.eventDate).toLocaleDateString()}
                            </Card.Subtitle>
                            <Card.Text>{event.description}</Card.Text>
                            <Card.Text>Duration: {event.duration}</Card.Text>
                        </Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <strong>Attendees:</strong>
                            </ListGroup.Item>
                            {attendees.map((attendee, index) => (
                                <ListGroup.Item
                                    key={index}
                                    style={{
                                        color: handleStatusColor(
                                            attendee.status
                                        ),
                                    }}
                                >
                                    {attendee.firstName} {attendee.lastName}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>

                    {confirmButtonShow ? (
                        <>
                            <Button
                                style={{ cursor: "pointer" }}
                                onClick={handleDelete}
                            >
                                CONFIRM DELETE EVENT: {event.name}
                            </Button>
                            <Button
                                style={{ cursor: "pointer" }}
                                onClick={handleConfirmButton}
                            >
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <>
                            <NavLink to={`/events/${id}/edit`}>
                                <Button style={{ cursor: "pointer" }}>
                                    Edit Event
                                </Button>
                            </NavLink>
                            <Button
                                style={{ cursor: "pointer" }}
                                onClick={handleConfirmButton}
                            >
                                Delete Event
                            </Button>{" "}
                        </>
                    )}
                </div>
            );
        }
    };

    return (
        <>
            <MainNav />
            {deleted ? (
                <>
                    <h3>Event deleted successfully.</h3>
                    <NavLink to="/events">Back to My Events</NavLink>
                </>
            ) : (
                eventDisplay()
            )}
            <MainFooter />
        </>
    );
}
