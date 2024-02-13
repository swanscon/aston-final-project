import React, { useState } from "react";
import { Form, Button, Card, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useData } from "../context/DataProvider";
import { mapDurationToHours, mapDurationToMinutes } from "../utils/MapDurationToNums";

export default function EditForm({ eventDetails, onEventChange, attendees, onAttendeesChange }) {
	const { data } = useData();
	const [hours, setHours] = useState(mapDurationToHours(eventDetails.duration));
	const [minutes, setMinutes] = useState(mapDurationToMinutes(eventDetails.duration));

	const games = data.games || [];
	const gameTypes = data.gameTypes || [];

	const handleDurationFormat = (hh, mm) => {
		const numHours = Number.parseInt(hh);
		const numMinutes = Number.parseInt(mm);
		let hString = "";
		if (numHours > 0) {
			hString += numHours + " hour";
			if (numHours > 1) {
				hString += "s";
			}
		}
		let mString = "";
		if (numMinutes > 0) {
			mString += numMinutes + " minutes";
		}
		if (numHours === 0 && numMinutes === 0) {
			return "None";
		} else {
			return hString + " " + mString;
		}
	};

	const handleDateChange = (date) => {
		onEventChange({
			...eventDetails,
			eventDate: date,
		});
	};

	const handleChange = (e) => {
		if (e.target.name === "hours" || e.target.name === "minutes") {
			const newHours = e.target.name === "hours" ? e.target.value : hours;
			const newMinutes = e.target.name === "minutes" ? e.target.value : minutes;

			if (e.target.name === "hours") {
				setHours(newHours);
			} else if (e.target.name === "minutes") {
				setMinutes(newMinutes);
			}
			const duration = handleDurationFormat(newHours, newMinutes);
			onEventChange({
				...eventDetails,
				duration: duration,
			});
		} else {
			onEventChange({
				...eventDetails,
				[e.target.name]: e.target.value,
			});
		}
	};

	const handleAddAttendee = () => {
		if (attendees.length < 25) {
			const newAttendees = [...attendees, { id: "", eventId: eventDetails.id, firstName: "", lastName: "", status: "Pending" }];
			onAttendeesChange(newAttendees);
		}
	};

	const handleRemoveAttendee = (index) => {
		const newAttendees = attendees.filter((_, i) => i !== index);
		onAttendeesChange(newAttendees);
	};

	const handleAttendeeChange = (index, field, value) => {
		const newAttendees = attendees.map((attendee, i) =>
			i === index ? { ...attendee, [field]: value } : attendee
		);
		onAttendeesChange(newAttendees);
	};

	return (
		<Form>
            {/* Event */}
			<Card className="mb-4">
				<Card.Body>
					<Card.Title>Edit Event Details</Card.Title>

						<Form.Group controlId="formEventName">
							<Form.Label>Event Name</Form.Label>
							<Form.Control
								type="text"
                                placeholder="Enter event name"
                                name="name"
                                value={eventDetails.name || ''}
                                onChange={handleChange}
							/>
						</Form.Group>

						<Form.Group controlId="formGameSelect">
							<Form.Label>Select Game</Form.Label>
							<Form.Select value={eventDetails.gameId || ""} onChange={handleChange} name="gameId"> 
								<option>Select a game...</option>
								{gameTypes.map((type) => (
									<optgroup label={type.name} key={type.id}>
										{games
											.filter((game) => game.gameTypeRequest.id === type.id)
											.map((game) => (
												<option value={game.id} key={game.id}>
													{game.name}
												</option>
											))}
									</optgroup>
								))}
							</Form.Select>
						</Form.Group>

						<Form.Group controlId="formEventDate">
							<Form.Label>Event Date</Form.Label>
							<DatePicker
								selected={eventDetails.eventDate ? new Date(eventDetails.eventDate) : null}
                                name="eventDate"
								onChange={handleDateChange}
								className="form-control"
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formEventDuration">
							<Form.Label>Duration</Form.Label>
							<div className="d-flex">
								<Form.Select
									aria-label="Duration hours"
									name="hours"
									value={Number.parseInt(hours) || "00"}
									onChange={handleChange}
									className="me-2"
								>
									{[...Array(24).keys()].map((hour) => (
										<option key={hour} value={hour}>
											{hour} Hour(s)
										</option>
									))}
								</Form.Select>
								<Form.Select
									aria-label="Duration minutes"
									name="minutes"
									value={minutes || "00"}
									onChange={handleChange}
								>
									{["00", "15", "30", "45"].map((minute) => (
										<option key={minute} value={minute}>
											{minute} Minute(s)
										</option>
									))}
								</Form.Select>
							</div>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formEventDescription">
							<Form.Label>Description</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								placeholder="Enter event description"
                                name="description"
								value={eventDetails.description || ""}
								onChange={handleChange}
							/>
						</Form.Group>

				</Card.Body>
			</Card>

			{/* Attendees */}
			<Card>
				<Card.Body>
					<Card.Title>Attendees</Card.Title>
					{attendees.map((attendee, index) => (
						<Row key={index}>
							<Form.Control
								type="text"
								placeholder="First Name"
                                name="firstName"
								value={attendee.firstName || ""}
								onChange={(e) =>
									handleAttendeeChange(index, "firstName", e.target.value)
								}
							/>

							<Form.Control
								type="text"
								placeholder="Last Name"
                                name="lastName"
								value={attendee.lastName || ""}
								onChange={(e) =>
									handleAttendeeChange(index, "lastName", e.target.value)
								}
							/>
							<Form.Select
                                name="status"
								value={attendee.status || ""}
								onChange={(e) =>
									handleAttendeeChange(index, "status", e.target.value)
								}
							>
								<option value="Pending">Pending</option>
								<option value="Accepted">Accepted</option>
								<option value="Declined">Declined</option>
							</Form.Select>
							<Button variant="danger" onClick={() => handleRemoveAttendee(index)}>
								Remove
							</Button>
						</Row>
					))}

					<Button onClick={handleAddAttendee} className="mt-2">
						Add Attendee
					</Button>
				</Card.Body>
			</Card>
		</Form>
	);
}
