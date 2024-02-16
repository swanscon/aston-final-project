import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { sortByField } from "../utils/SortByField";
import DatePicker from "react-datepicker";
import TimePicker from "react-bootstrap-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import { formatTimeForSubmission } from "../utils/HandleTimeFormat";

const EventForm = ({ eventDetails, onEventChange }) => {
	const [games, setGames] = useState([]);
	const [gameTypes, setGameTypes] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

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
				sortByField(loadedGames, "name");
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
				sortByField(loadedGameTypes, "name");
				setIsLoading(false);
				setGameTypes(loadedGameTypes);
			});
	}, []);

	const handleTimeChange = (time, field) => {
		// Convert the Date object back to HH:MM:SS
		const newTime = formatTimeForSubmission(time);

		// Update the eventDetails state
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
		onEventChange({
			...eventDetails,
			[e.target.name]: e.target.value,
		});
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
					<Form.Group className="mb-3" controlId="formEventName">
						<Form.Label>Event Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter event name"
							name="name"
							value={eventDetails.name || ""}
							onChange={handleChange}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label>Select Game</Form.Label>
						<Form.Select
							name="gameId"
							value={eventDetails.gameId}
							onChange={handleChange}
						>
							<option value="">Select a game...</option>
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

					<Form.Group className="mb-3" controlId="formEventDate">
						<Form.Label>Event Date</Form.Label>
						<DatePicker
							selected={
								eventDetails.eventDate ? new Date(eventDetails.eventDate) : null
							}
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
							onChange={(time) => handleTimeChange(time, "startTime")}
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
							onChange={(time) => handleTimeChange(time, "endTime")}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formEventDescription">
						<Form.Label>Description</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							placeholder="Enter event description"
							name="description"
							value={eventDetails.description}
							onChange={handleChange}
						/>
					</Form.Group>
				</Form>
			)}
		</>
	);
};

export default EventForm;
