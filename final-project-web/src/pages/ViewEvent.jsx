import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";
import { useData } from "../context/DataProvider";
import MainNav from "../components/MainNav";

function ViewEvent() {
	let { id } = useParams();
	const { data } = useData();
	const event = data.events.find((event) => event.id === id);
	const attendeesForEvent = data.attendees.filter((attendee) => attendee.eventId === id);

	const handleStatusColor = (status) => {
		if (status === "Accepted") {
			return "green";
		} else if (status === "Declined") {
			return "red";
		} else {
			return "gold";
		}
	};

	if (!event) {
		return <div>Event not found</div>;
	}

	return (
		<>
			<MainNav />
			<div>
				<Card style={{ width: "18rem", margin: "auto", marginTop: "20px" }}>
					<Card.Body>
						<Card.Title>{event.name}</Card.Title>
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
						{attendeesForEvent.map((attendee, index) => (
							<ListGroup.Item key={index} style={{color: handleStatusColor(attendee.status)}}>
								{attendee.firstName} {attendee.lastName}
							</ListGroup.Item>
						))}
					</ListGroup>
				</Card>
			</div>
		</>
	);
}

export default ViewEvent;
