import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import TimePicker from "react-bootstrap-time-picker";
import { sortByField } from "../../utils/SortByField";
import { formatTimeForSubmission } from "../../utils/HandleTimeFormat";

export default function AdminNewEvent() {
	const [event, setEvent] = useState({
		name: "",
		gameId: "",
		eventDate: new Date(),
		startTime: "",
		endTime: "",
	});
	const [games, setGames] = useState([]);

	useEffect(() => {
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
				sortByField(loadedGames, "name", "Asc");
				setGames(loadedGames);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleChange = (e) => {
		setEvent({
			...event,
			[e.target.name]: e.target.value,
		});
	};

	const handleDateChange = (date) => {
		setEvent({
			...event,
			eventDate: date,
		});
	};

	const handleTimeChange = (time, field) => {
		const newTime = formatTimeForSubmission(time);
		setEvent({
			...event,
			[field]: newTime,
		});
	};

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const eventResponse = await fetch("http://localhost:8182/api/event", {
				method: "POST",
				body: JSON.stringify(event),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!eventResponse.ok) {
				throw new Error("Failed to create new event.");
			}
			navigate("/admin/event");
		} catch (error) {
			console.log(error);
		}
	};

	const handleClear = () => {
		setEvent({
			name: "",
			gameId: "",
			eventDate: new Date(),
			startTime: "",
			endTime: "",
			description: "",
		});
	};

	return (
		<>
			<h3>New Event</h3>
			<NavLink to="/admin/event">Back</NavLink>
			<NavLink to="#" onClick={handleClear}>Clear</NavLink>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="formEventName">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter event name"
						name="name"
						value={event.name || ""}
						onChange={handleChange}
					></Form.Control>
				</Form.Group>
				<Form.Group>
					<Form.Label>Game</Form.Label>
					<Form.Select name="gameId" value={event.gameId} onChange={handleChange}>
						<option value="">Select a game...</option>
						{games.map((game) => (
							<option value={game.id} key={game.id}>
								{game.name}
							</option>
						))}
					</Form.Select>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formEventDate">
					<Form.Label>Date</Form.Label>
					<DatePicker
						selected={event.eventDate ? new Date(event.eventDate) : null}
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
						value={event.startTime}
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
						value={event.endTime}
						onChange={(time) => handleTimeChange(time, "endTime")}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formEventDescription">
					<Form.Label>Description</Form.Label>
					<Form.Control
						as="textarea"
						rows={4}
						maxLength={255}
						placeholder="Enter event description"
						name="description"
						value={event.description}
						onChange={handleChange}
					/>
				</Form.Group>
				<Button type="submit">Save Event</Button>
			</Form>
		</>
	);
}
