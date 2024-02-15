import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import AdminSearch from "../components/AdminSearch";
import EventTable from "../components/EventTable";
import { NavLink } from "react-router-dom";

export default function AdminEvent() {
	const [events, setEvents] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [sortParam, setSortParam] = useState("name");

	useEffect(() => {
		const fetchEventsAndAttendeeCounts = async () => {
			try {
				const eventResponse = await fetch("http://localhost:8182/api/event");
				if (!eventResponse.ok) {
					throw new Error("Failed to fetch events");
				}
				const eventData = await eventResponse.json();
				const loadedEvents = Object.keys(eventData)
					.map((key) => ({
						id: key,
						...eventData[key],
					}))
					.filter(
						(event) =>
							searchText === "" ||
							event.name.toUpperCase().includes(searchText.toUpperCase())
					);

				const attendeeCountsPromises = loadedEvents.map(async (event) => {
					const attendeeResponse = await fetch(
						`http://localhost:8183/api/attendee/event/${event.id}`
					);
					if (!attendeeResponse.ok) {
						throw new Error("Failed to fetch attendees for event " + event.id);
					}
					const attendees = await attendeeResponse.json();
					return { eventId: event.id, count: Object.keys(attendees).length };
				});
				const attendeeCounts = await Promise.all(attendeeCountsPromises);
				const eventsWithAttendeeCounts = loadedEvents.map((event) => ({
					...event,
					attendeeCount:
						attendeeCounts.find((count) => count.eventId === event.id)?.count || 0,
				}));
				setEvents(eventsWithAttendeeCounts);
			} catch (error) {
				console.error(error);
			}
		};
		fetchEventsAndAttendeeCounts();
	}, [searchText]);

	const handleSortBy = (e) => {
		setSortParam(e.target.value);
	};

	return (
		<>
			<h2>Event Management</h2>
			{/* CRUD Links here */}
			<div>
				<NavLink to="#">
					<Button>Create a New Game</Button>
				</NavLink>
			</div>
			<NavLink to="/admin">Back</NavLink>
			<AdminSearch onSearch={setSearchText} />
			<div>
				<Form>
					<Form.Label>Sort By: </Form.Label>
					<Form.Check
						inline
						type="radio"
						label="Name"
						name="sortOptions"
						value="name"
						checked={sortParam === "name"}
						onChange={handleSortBy}
					/>
					{/* <Form.Check
						inline
						type="radio"
						label="Game"
						name="sortOptions"
						value="gameId"
						checked={sortParam === "gameId"}
						onChange={handleSortBy}
					/> */}
					<Form.Check
						inline
						type="radio"
						label="Date"
						name="sortOptions"
						value="eventDate"
						checked={sortParam === "eventDate"}
						onChange={handleSortBy}
					/>
					<Form.Check
						inline
						type="radio"
						label="Attendees"
						name="sortOptions"
						value="attendeeCount"
						checked={sortParam === "attendeeCount"}
						onChange={handleSortBy}
					/>
				</Form>
			</div>
			<EventTable events={events} sortParam={sortParam} />
		</>
	);
}
