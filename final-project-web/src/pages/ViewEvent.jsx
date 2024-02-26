import { useParams, NavLink, useNavigate } from "react-router-dom";
import { Card, ListGroup, Container, Row, Col, Button } from "react-bootstrap";
import MainNav from "../components/MainNav";
import { useState, useEffect } from "react";
import MainFooter from "../components/MainFooter";
import { formatAmPm } from "../utils/HandleTimeFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faQuestionCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "../styles/event.css";
import "../styles/styles.css";

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
		const fetchEvent = fetch(`http://localhost:8182/api/event/${id}`).then((response) => {
			if (!response.ok) throw new Error("Event could not be fetched!");
			return response.json();
		});

		fetchEvent
			.then((eventData) => {
				const gameId = eventData.gameId;
				return fetch(`http://localhost:8181/api/game/${gameId}`)
					.then((response) => {
						if (!response.ok) throw new Error("Game could not be fetched!");
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
						const loadedAttendees = Object.keys(attendeesData).map((key) => ({
							id: key,
							...attendeesData[key],
						}));
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
				const eventResponse = await fetch(`http://localhost:8182/api/event/${event.id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				});
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
			return (
				<FontAwesomeIcon
					icon={faCheckCircle}
					className="event-accepted"
					title={`Status: ${status}`}
				/>
			);
		} else if (status === "Declined") {
			return (
				<FontAwesomeIcon
					icon={faTimesCircle}
					className="event-declined"
					title={`Status: ${status}`}
				/>
			);
		} else {
			return (
				<FontAwesomeIcon
					icon={faQuestionCircle}
					className="event-pending"
					title={`Status: ${status}`}
				/>
			);
		}
	};

	const eventDisplay = () => {
		if (isLoading) {
			return <>Loading...</>;
		} else {
			return (
				<div className="content-wrap">
					<Container fluid className="page-display">
						<Row className="justify-content-center">
							<Col md={8} lg={6}>
								<Card className="event-card">
									<Card.Header className="event-header">{event.name}</Card.Header>
									<Card.Body className="event-body">
										<Card.Subtitle className="mb-2 text-muted">
											Game: {game.name}
										</Card.Subtitle>
										<Card.Subtitle className="mb-2 text-muted">
											Event Date:{" "}
											{new Date(event.eventDate).toLocaleDateString()}
										</Card.Subtitle>
										<Card.Text>{event.description}</Card.Text>
										<Card.Text>
											Start Time: {formatAmPm(event.startTime)}
										</Card.Text>
										<Card.Text>End Time: {formatAmPm(event.endTime)}</Card.Text>
									</Card.Body>
									<ListGroup variant="flush">
										<ListGroup.Item>
											<strong>Attendees:</strong>
										</ListGroup.Item>
										{attendees.map((attendee, index) => (
											<ListGroup.Item key={index}>
												{handleStatusColor(attendee.status)}{" "}
												{attendee.firstName} {attendee.lastName}
											</ListGroup.Item>
										))}
									</ListGroup>
								</Card>

								{confirmButtonShow ? (
									<>
										<Button
											variant="danger"
											className="event-button"
											onClick={handleDelete}
										>
											CONFIRM DELETE EVENT: {event.name}
										</Button>
										<Button
											variant="secondary"
											className="event-button"
											onClick={handleConfirmButton}
										>
											Cancel
										</Button>
									</>
								) : (
									<>
										<NavLink to={`/events/${id}/edit`}>
											<Button variant="success" className="event-button">
												Edit Event
											</Button>
										</NavLink>
										<Button
											variant="danger"
											className="event-button"
											onClick={handleConfirmButton}
										>
											Delete Event
										</Button>
									</>
								)}
							</Col>
						</Row>
					</Container>
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
