import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import MainNav from "../components/MainNav";
import EventForm from "../components/EventForm";
import AttendeeForm from "../components/AttendeeForm";
import MainFooter from "../components/MainFooter";
import useAuth from "../context/AuthContext";
import "../styles/event.css";
import "../styles/styles.css";

export default function NewEvent() {
	const { auth } = useAuth();
	const [eventDetails, setEventDetails] = useState({
		id: "",
		gameId: "",
		name: "",
		eventDate: new Date(),
		startTime: "00:00:00",
		endTime: "00:00:00",
		description: "",
	});
	const [attendees, setAttendees] = useState([{ firstName: "", lastName: "" }]);

	const navigate = useNavigate();

	const handleFormFilled = () => {
		if (eventDetails.name.length > 0 && eventDetails.gameId.length > 0) {
			handleSubmit();
		} else {
			alert("Event Name & Select Game fields required.");
		}
	};

	const handleSubmit = async () => {
		const newEvent = {
			...eventDetails,
			eventDate: eventDetails.eventDate.toISOString(),
		};

		try {
			const eventResponse = await fetch("http://localhost:8182/api/event", {
				method: "POST",
				body: JSON.stringify(newEvent),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!eventResponse.ok) {
				throw new Error("Failed to create the event");
			}

			const eventData = await eventResponse.json();

			const newUserEvent = {
				eventId: eventData.id,
				userId: auth.id,
			};

			const userEventResponse = await fetch("http://localhost:8185/api/user/event", {
				method: "POST",
				body: JSON.stringify(newUserEvent),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${auth.token}`,
				},
			});

			if (!userEventResponse.ok) {
				throw new Error("Failed to create user event");
			}

			const newAttendees = attendees
				.filter((attendee) => !(attendee.firstName === "" && attendee.lastName === ""))
				.map((attendee) => ({
					...attendee,
					eventId: eventData.id,
				}));

			// Submit each attendee
			for (const attendee of newAttendees) {
				await fetch("http://localhost:8183/api/attendee", {
					method: "POST",
					body: JSON.stringify(attendee),
					headers: {
						"Content-Type": "application/json",
					},
				});
			}

			navigate("/events");
		} catch (error) {
			console.error("Failed to submit new event and attendees", error);
		}
	};

	return (
		<>
			<MainNav />
			<div className="content-wrap">
				<Container fluid classname="page-display">
					<Row className="justify-content-center">
						<Col md={8} lg={6}>
							<Card className="event-card">
								<Card.Header className="event-header">Create New Event</Card.Header>
								<Card.Body className="event-body">
									<EventForm
										eventDetails={eventDetails}
										onEventChange={setEventDetails}
									/>
									<AttendeeForm
										attendees={attendees}
										onAttendeesChange={setAttendees}
									/>

									<Button
										variant="primary"
										className="event-button"
										onClick={handleFormFilled}
									>
										Submit
									</Button>

									<NavLink to="/events/" className="d-block mt-3">
										<Button variant="secondary" className="event-button">
											Back
										</Button>
									</NavLink>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
			<MainFooter />
		</>
	);
}
