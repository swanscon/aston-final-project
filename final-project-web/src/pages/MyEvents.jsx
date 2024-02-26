import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import MainNav from "../components/MainNav";
import { useEffect, useState } from "react";
import MainFooter from "../components/MainFooter";
import { handleDateFormat } from "../utils/HandleDateFormat";
import useAuth from "../context/AuthContext";

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
							"Authorization": `Bearer ${auth.token}`,
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
					const loadedEvents = eventsData.filter(event => loadedUserEvents.includes(event.id));
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
			<div style={{ border: "solid orange 2px" }}>
				{isLoading ? (
					<>
						<h1>My Events</h1>
						<p>Loading data...</p>
					</>
				) : (
					<>
						<h1>My Events</h1>
						<NavLink to="/events/new">
							<Button style={{ cursor: "pointer" }}>Create a New Event</Button>
						</NavLink>
						<ul style={{ listStyle: "none" }}>
							{events.map((event) => (
								<NavLink to={`/events/${event.id}`} key={event.id}>
									<li>
										{event.name} - {handleDateFormat(event.eventDate)}
									</li>
								</NavLink>
							))}
						</ul>
					</>
				)}
			</div>
			<MainFooter />
		</>
	);
}
