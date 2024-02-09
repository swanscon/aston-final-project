import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EventForm() {
	const [games, setGames] = useState([]);
	const [selectedGame, setSelectedGame] = useState("");
	const [name, setName] = useState("");
	const [eventDate, setEventDate] = useState(new Date());
	const [durationHours, setDurationHours] = useState("00");
	const [durationMinutes, setDurationMinutes] = useState("00");
	const [description, setDescription] = useState("");

	useEffect(() => {
		// Fetch the game names and IDs
		fetch("http://localhost:8081/api/game")
			.then((response) => response.json())
			.then((data) => setGames(data))
			.catch((error) => console.error("Error fetching games:", error));
	}, []);

    function addEventHandler(eventData) {
        fetch(
            "http://localhost:8081/api/event",
            {
                method: 'POST',
                body: JSON.stringify(eventData),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(response => {
                if(!response.ok) {
                    throw new Error('Network response was not okay: ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                console.log('Success: ', data);
            })
            .catch(error => {
                console.error('Error: ', error);
            });
    }

	const handleSubmit = (event) => {
		event.preventDefault();
		const eventData = {
			gameId: selectedGame,
			name,
			eventDate: eventDate.toISOString(),
			duration: `${durationHours} Hour ${durationMinutes} Minutes`,
			description,
		};
		addEventHandler(eventData);
        //ADD ATTENDEES HANDLER
		console.log(eventData);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className="mb-3" controlId="formGameSelect">
				<Form.Label>Select Game</Form.Label>
				<Form.Select
					aria-label="Game select"
					value={selectedGame}
					onChange={(e) => setSelectedGame(e.target.value)}
				>
					<option>Select a game...</option>
					{games.map((game) => (
						<option key={game.id} value={game.id}>
							{game.name}
						</option>
					))}
				</Form.Select>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formEventName">
				<Form.Label>Event Name</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter event name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formEventDate">
				<Form.Label>Event Date</Form.Label>
				<DatePicker selected={eventDate} onChange={(date) => setEventDate(date)} />
			</Form.Group>

			<Form.Group className="mb-3" controlId="formEventDurationHours">
				<Form.Label>Duration Hours</Form.Label>
				<Form.Select
					value={durationHours}
					onChange={(e) => setDurationHours(e.target.value)}
				>
					{[...Array(24).keys()].map((hour) => (
						<option key={hour} value={hour}>
							{hour < 10 ? `0${hour}` : hour}
						</option>
					))}
				</Form.Select>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formEventDurationMinutes">
				<Form.Label>Duration Minutes</Form.Label>
				<Form.Select
					value={durationMinutes}
					onChange={(e) => setDurationMinutes(e.target.value)}
				>
					{["00", "15", "30", "45"].map((minute) => (
						<option key={minute} value={minute}>
							{minute}
						</option>
					))}
				</Form.Select>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formEventDescription">
				<Form.Label>Description</Form.Label>
				<Form.Control
					as="textarea"
					rows={3}
					placeholder="Enter event description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</Form.Group>

			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
}
