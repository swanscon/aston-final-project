import { useState, useEffect } from "react";
import { Form, Button, Card, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-bootstrap-time-picker";
import { formatTimeForSubmission } from "../utils/HandleTimeFormat";

export default function EditForm({
	eventDetails,
	onEventChange,
	attendees,
	onAttendeesChange,
	delAttendees,
	onAttendeesDel,
}) {
	const [games, setGames] = useState([]);
	const [gameTypes, setGameTypes] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [newId, setNewId] = useState(-1);

	useEffect(() => {
		setIsLoading(true);
		fetch("http://localhost:8181/api/game")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				const loadedGames = [];
				for (const key in data) {
					const game = {
						id: key,
						...data[key],
					};
					loadedGames.push(game);
				}
				setIsLoading(false);
				setGames(loadedGames);
			});
		setIsLoading(true);
		fetch("http://localhost:8181/api/game/type")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				const loadedGameTypes = [];
				for (const key in data) {
					const gameType = {
						id: key,
						...data[key],
					};
					loadedGameTypes.push(gameType);
				}
				setIsLoading(false);
				setGameTypes(loadedGameTypes);
			});
	}, []);

	const handleTimeChange = (time, field) => {
		const newTime = formatTimeForSubmission(time);
		onEventChange({
			...eventDetails,
			[field]: newTime,
		});
	};

	const handleDateChange = (date) => {
		onEventChange({
			...eventDetails,
			eventDate: date,
		});
	};

	const handleChange = (e) => {
		console.log(e.target.name);
		onEventChange({
			...eventDetails,
			[e.target.name]: e.target.value,
		});
	};

	const handleAddAttendee = () => {
		if (attendees.length - delAttendees.length < 25) {
			setNewId(newId - 1);
			const newAttendees = [
				...attendees,
				{
					id: newId,
					eventId: eventDetails.id,
					firstName: "",
					lastName: "",
				},
			];
			onAttendeesChange(newAttendees);
		}
	};

	const handleRemoveAttendee = (index) => {
		const attendeeIdToRemove = attendees[index].id;
		onAttendeesDel(attendeeIdToRemove);
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
		<>
			{isLoading ? (
				<>
					<h1>My Events</h1>
					<p>Loading data...</p>
				</>
			) : (
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
									value={eventDetails.name || ""}
									onChange={handleChange}
								/>
							</Form.Group>

							<Form.Group controlId="formGameSelect">
								<Form.Label>Select Game</Form.Label>
								<Form.Select
									value={eventDetails.gameId || ""}
									onChange={handleChange}
									name="gameId"
								>
									<option>Select a game...</option>
									{gameTypes.map((type) => (
										<optgroup label={type.name} key={type.id}>
											{games
												.filter((game) => game.gameType.id === type.id)
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
									selected={
										eventDetails.eventDate
											? new Date(eventDetails.eventDate)
											: null
									}
									name="eventDate"
									onChange={handleDateChange}
									className="form-control"
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formStartTime">
								<Form.Label>Start Time</Form.Label>
								<TimePicker
									start="00:00"
									end="23:59"
									step={15}
									format={12}
									value={eventDetails.startTime}
									onChange={(value) => handleTimeChange(value, "startTime")}
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formEndTime">
								<Form.Label>End Time</Form.Label>
								<TimePicker
									start="00:00"
									end="23:59"
									step={15}
									format={12}
									value={eventDetails.endTime}
									onChange={(value) => handleTimeChange(value, "endTime")}
								/>
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
									<Button
										variant="danger"
										onClick={() => handleRemoveAttendee(index)}
									>
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
			)}
		</>
	);
}
