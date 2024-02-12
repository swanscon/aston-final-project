import React, { useState, useEffect } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useNavigate } from "react-router-dom";
import { useData } from "../context/DataProvider";

export default function EditForm() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { data, setData } = useData();
	const games = data.games || [];
	const gameTypes = data.gameTypes || [];
	const event = data.events.find((e) => e.id === id);
	const attendeesForEvent = data.attendees.filter((attendee) => attendee.eventId === id);

	// State for event and attendees
	const [eventDetails, setEventDetails] = useState(event);
	const [attendees, setAttendees] = useState(attendeesForEvent);

	useEffect(() => {
		setEventDetails(event);
		setAttendees(attendeesForEvent);
	}, [event, attendeesForEvent, id]);

	const handleInputChange = (name, value) => {
		setEventDetails((prev) => ({ ...prev, [name]: value }));
	};

	const handleDateChange = (date) => {
		handleInputChange("eventDate", date);
	};

	const handleGameChange = (e) => {
		const selectedGameId = e.target.value;
		handleInputChange("gameId", selectedGameId);
	};

	const handleAttendeeChange = (index, field, value) => {
		const updatedAttendees = [...attendees];
		updatedAttendees[index] = { ...updatedAttendees[index], [field]: value };
		setAttendees(updatedAttendees);
	};

	const addAttendee = () => {
		setAttendees((prev) => [
			...prev,
			{
				id: Date.now().toString(),
				eventId: id,
				firstName: "",
				lastName: "",
				status: "Pending",
			},
		]);
	};

	const removeAttendee = (index) => {
		setAttendees((prev) => prev.filter((_, i) => i !== index));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const updatedEvents = data.events.map((e) => (e.id === eventDetails.id ? eventDetails : e));
		const updatedAttendees = data.attendees.filter((a) => a.eventId !== id).concat(attendees);

		setData({ ...data, events: updatedEvents, attendees: updatedAttendees });
		navigate(`/events/${id}`);
	};

	return (
		<Form onSubmit={handleSubmit}>
			{/* Event details form inputs */}
			<Card className="mb-4">
				<Card.Body>
					<Card.Title>Edit Event Details</Card.Title>
					<Form>
						<Row className="mb-3">
							<Form.Group as={Col} controlId="formEventName">
								<Form.Label>Event Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter event name"
									value={event.name}
									onChange={(e) => handleInputChange("name", e.target.value)}
								/>
							</Form.Group>

							<Form.Group as={Col} controlId="formGameSelect">
								<Form.Label>Select Game</Form.Label>
								<Form.Select value={event.gameId} onChange={handleGameChange}>
									<option>Select a game...</option>
									{gameTypes.map((type) => (
										<optgroup label={type.name} key={type.id}>
											{games
												.filter(
													(game) => game.gameTypeRequest.id === type.id
												)
												.map((game) => (
													<option value={game.id} key={game.id}>
														{game.name}
													</option>
												))}
										</optgroup>
									))}
								</Form.Select>
							</Form.Group>
						</Row>

						<Row className="mb-3">
							<Form.Group as={Col} controlId="formEventDate">
								<Form.Label>Event Date</Form.Label>
								<DatePicker
									selected={new Date(event.eventDate)}
									onChange={handleDateChange}
									className="form-control"
								/>
							</Form.Group>

							<Form.Group as={Col} controlId="formEventDuration">
								<Form.Label>Duration</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter duration"
									value={event.duration}
									onChange={(e) => handleInputChange("duration", e.target.value)}
								/>
							</Form.Group>
						</Row>

						<Form.Group className="mb-3" controlId="formEventDescription">
							<Form.Label>Description</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								placeholder="Enter event description"
								value={event.description}
								onChange={(e) => handleInputChange("description", e.target.value)}
							/>
						</Form.Group>
					</Form>
				</Card.Body>
			</Card>

			{/* Attendees management */}
			<Card>
				<Card.Body>
					<Card.Title>Attendees</Card.Title>
					{attendees.map((attendee, index) => (
						<Row key={attendee.id} className="align-items-center mb-2">
							<Col>
								<Form.Control
									type="text"
									placeholder="First Name"
									value={attendee.firstName}
									onChange={(e) =>
										handleAttendeeChange(index, "firstName", e.target.value)
									}
								/>
							</Col>
							<Col>
								<Form.Control
									type="text"
									placeholder="Last Name"
									value={attendee.lastName}
									onChange={(e) =>
										handleAttendeeChange(index, "lastName", e.target.value)
									}
								/>
							</Col>
							<Col>
								<Form.Select
									value={attendee.status}
									onChange={(e) =>
										handleAttendeeChange(index, "status", e.target.value)
									}
								>
									<option value="Pending">Pending</option>
									<option value="Accepted">Accepted</option>
									<option value="Declined">Declined</option>
								</Form.Select>
							</Col>
							<Col xs="auto">
								<Button variant="danger" onClick={() => removeAttendee(index)}>
									Remove
								</Button>
							</Col>
						</Row>
					))}
					<Button onClick={addAttendee} className="mt-2">
						Add Attendee
					</Button>
				</Card.Body>
			</Card>
		</Form>
	);
}
