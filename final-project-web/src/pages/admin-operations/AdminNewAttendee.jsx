import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { sortByName } from "../../utils/SortByName";
import { NavLink, useNavigate } from "react-router-dom";

export default function AdminNewAttendee() {
	const [events, setEvents] = useState([]);
	const [attendee, setAttendee] = useState({
		eventId: "",
		firstName: "",
		lastName: "",
		status: "Pending",
	});
    const [changesMade, setChangesMade] = useState(false);

	useEffect(() => {
		fetch("http://localhost:8182/api/event")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to fetch events.");
				}
                return response.json();
			})
			.then((data) => {
				const loadedEvents = [];
				for (const key in data) {
					const event = {
						id: key,
						...data[key],
					};
					loadedEvents.push(event);
				}
				sortByName(loadedEvents);
				setEvents(loadedEvents);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleChange = (e) => {
		setAttendee({
			...attendee,
			[e.target.name]: e.target.value,
		});
	};

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
        e.preventDefault();
        setChangesMade(false);
		try {
			const attendeeResponse = await fetch("http://localhost:8183/api/attendee", {
				method: "POST",
				body: JSON.stringify(attendee),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!attendeeResponse.ok) {
				throw new Error("Failed to create new attendee.");
			}
            setChangesMade(true);
            navigate("/admin/attendee");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<h3>New Attendee</h3>
			<NavLink to="/admin/attendee">Back</NavLink>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>Select Event</Form.Label>
					<Form.Select name="eventId" value={attendee.eventId} onChange={handleChange}>
						<option value="">Select an event...</option>
						{events.map((event) => (
							<option value={event.id} key={event.id}>
								{event.name} - [{event.id}]
							</option>
						))}
					</Form.Select>
				</Form.Group>
				<Form.Group>
					<Form.Label>First Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="First Name"
						name="firstName"
						value={attendee.firstName || ""}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Last Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Last Name"
						name="lastName"
						value={attendee.lastName || ""}
						onChange={handleChange}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Save Changes
				</Button>
			</Form>
            {changesMade ? (
                <p style={{color: 'green'}}>Changes saved successfully.</p>
            ) : (
                <></>
            )}
		</>
	);
}
