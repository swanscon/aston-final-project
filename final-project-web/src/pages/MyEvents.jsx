import { Button, Container, ListGroup, Spinner, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import MainNav from "../components/MainNav";
import { useEffect, useState } from "react";
import MainFooter from "../components/MainFooter";
import { handleDateFormat } from "../utils/HandleDateFormat";
import useAuth from "../context/AuthContext";
import "../styles/event.css";
import "../styles/styles.css";

export default function MyEvents() {
	const { auth } = useAuth();
	const [events, setEvents] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchEvents = async () => {
			setIsLoading(true);
			try {
				const userEventsResponse = await fetch(
					`http://localhost:8185/api/user/event/${auth.id}`,
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${auth.token}`,
							"Content-Type": "application/json",
						},
					}
				);
				if (!userEventsResponse.ok) throw new Error("Failed to fetch user events");
				const userEventsData = await userEventsResponse.json();
				let loadedUserEvents = [];
				for (const userEvent of userEventsData) {
					loadedUserEvents.push(userEvent.eventId);
				}
				if (loadedUserEvents.length > 0) {
					const eventsResponse = await fetch("http://localhost:8182/api/event");
					if (!eventsResponse.ok) throw new Error("Failed to fetch all events");
					const eventsData = await eventsResponse.json();
					const loadedEvents = eventsData.filter((event) =>
						loadedUserEvents.includes(event.id)
					);
					setEvents(loadedEvents);
				} else {
					setEvents([]);
				}
			} catch (error) {
				console.error("Error fetching events:", error);
				setEvents([]);
			}
			setIsLoading(false);
		};

		fetchEvents();
	}, [auth.id, auth.token]);

	return (
		<>
			<MainNav />
			<div className="content-wrap">
				<Container fluid className="page-display">
					<Row className="justify-content-center">
						<Col md={8} lg={6}>
							{" "}
							{/* Adjust these values based on your desired width */}
							<h1 className="text-center mt-5">My Events</h1>
							<div className="content">
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
									risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
									nec, ultricies sed, dolor. Cras elementum ultrices diam.
								</p>
							</div>
							{isLoading ? (
								<div className="text-center">
									<Spinner animation="border" role="status">
										<span className="visually-hidden">Loading...</span>
									</Spinner>
								</div>
							) : (
								<>
									<NavLink to="/events/new">
										<Button variant="success" className="mb-3">
											Create a New Event
										</Button>
									</NavLink>
									<ListGroup>
										{events.map((event) => (
											<NavLink
												to={`/events/${event.id}`}
												key={event.id}
												className="event-link"
											>
												<ListGroup.Item action variant="light">
													{event.name} -{" "}
													{handleDateFormat(event.eventDate)}
												</ListGroup.Item>
											</NavLink>
										))}
									</ListGroup>
								</>
							)}
						</Col>
					</Row>
				</Container>
			</div>
			<MainFooter />
		</>
	);
}
