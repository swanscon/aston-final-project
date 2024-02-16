import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export default function AdminEditAttendee() {
	const { id } = useParams();
	const [attendee, setAttendee] = useState([]);
	const [eventName, setEventName] = useState([]);
    const [changesMade, setChangesMade] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const attendeeResponse = await fetch(`http://localhost:8183/api/attendee/${id}`);
				if (!attendeeResponse.ok) {
					throw new Error("Failed to fetch attendee");
				}
				const attendeeData = await attendeeResponse.json();
				setAttendee(attendeeData);

				if (attendeeData && attendeeData.eventId) {
					const eventResponse = await fetch(
						`http://localhost:8182/api/event/${attendeeData.eventId}`
					);
					if (!eventResponse.ok) {
						throw new Error("Failed to fetch event");
					}
					const eventData = await eventResponse.json();
					setEventName(eventData.name);
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [id]);

	const handleAttendeeChange = (field, value) => {
		setAttendee({ ...attendee, [field]: value });
	};

	const handleSubmit = async (e) => {
        e.preventDefault();
        setChangesMade(false);
		try {
			const updateResponse = await fetch(`http://localhost:8183/api/attendee/${id}`, {
				method: "PUT",
				body: JSON.stringify(attendee),
				headers: {
					"Content-Type": "application/json",
				},
			});
            if(!updateResponse.ok) {
                throw new Error("Failed to update attendee");
            }
            const statusReponse = await fetch(`http://localhost:8183/api/attendee/${id}/${attendee.status}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
			});
            if(!statusReponse.ok) {
                throw new Error("Failed to update attendee status");
            }
            setChangesMade(true);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<h3>Edit Attendee</h3>
            <NavLink to="/admin/attendee" >Back</NavLink>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>Event: {eventName}</Form.Label>
				</Form.Group>
				<Form.Group>
					<Form.Label>First Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="First Name"
						name="firstName"
						value={attendee.firstName || ""}
						onChange={(e) => handleAttendeeChange("firstName", e.target.value)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Last Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Last Name"
						name="lastName"
						value={attendee.lastName || ""}
						onChange={(e) => handleAttendeeChange("lastName", e.target.value)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Status</Form.Label>
					<Form.Select
						name="status"
						value={attendee.status || ""}
						onChange={(e) => handleAttendeeChange("status", e.target.value)}
					>
						<option value="Pending">Pending</option>
						<option value="Accepted">Accepted</option>
						<option value="Declined">Declined</option>
					</Form.Select>
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
