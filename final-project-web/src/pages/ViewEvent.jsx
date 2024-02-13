import { useParams, NavLink } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
// import { useData } from "../context/DataProvider";
import MainNav from "../components/MainNav";
import { useState, useEffect } from "react";

export default function ViewEvent() {
	let { id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [event, setEvent] = useState(null);
	const [game, setGame] = useState(null);
	const [attendees, setAttendees] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		console.log(`Sending request to: http://localhost:8182/api/event/${id}`);

		const fetchEvent = fetch(`http://localhost:8182/api/event/${id}`).then((response) => {
			if (!response.ok) throw new Error("Event could not be fetched!");
			return response.json();
		});

		fetchEvent
			.then((eventData) => {
				const gameId = eventData.gameId;
				console.log(`Loading game id: ${gameId}`);
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
				console.log(`Loading attendees for event: ${id}`);
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

	const handleStatusColor = (status) => {
		if (status === "Accepted") {
			return "green";
		} else if (status === "Declined") {
			return "red";
		} else {
			return "gold";
		}
	};

	return (
		<>
			<MainNav />
			{isLoading ? (
				<>Loading...</>
			) : (
				<div>
					<Card style={{ width: "18rem", margin: "auto", marginTop: "20px" }}>
						<Card.Body>
							<Card.Title>{event.name}</Card.Title>
							<Card.Subtitle>Game: {game.name}</Card.Subtitle>
							<Card.Subtitle className="mb-2 text-muted">
								Event Date: {new Date(event.eventDate).toLocaleDateString()}
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
									style={{ color: handleStatusColor(attendee.status) }}
								>
									{attendee.firstName} {attendee.lastName}
								</ListGroup.Item>
							))}
						</ListGroup>
					</Card>
					<NavLink to={`/events/${id}/edit`}>
						<Button style={{ cursor: "pointer" }}>Edit Event</Button>
					</NavLink>
				</div>
			)}
		</>
	);
}
