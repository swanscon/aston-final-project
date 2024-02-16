import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import AdminSearch from "../components/AdminSearch";
import EventTable from "../components/EventTable";
import { NavLink } from "react-router-dom";

export default function AdminEvent() {
	const [events, setEvents] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [sortParam, setSortParam] = useState("name");
	const [sortAsc, setSortAsc] = useState(true);

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

	const handleSortOrderChange = (e) => {
		setSortAsc(e.target.id === "asc");
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
					<Form.Group controlId="sortBySelect">
						<Form.Label>Sort By: </Form.Label>
						<Form.Select aria-label="Sort by" onChange={handleSortBy} value={sortParam}>
							<option value="name">Event</option>
							<option value="gameId">Game</option>
							<option value="eventDate">Date</option>
							<option value="attendeeCount">Attendees (qty)</option>
						</Form.Select>
					</Form.Group>
					<fieldset>
						<Form.Group>
							<Form.Label>Order: </Form.Label>
							<Form.Check
								inline
								type="radio"
								label="Asc"
								name="sortOrderOptions"
								id="asc"
								checked={sortAsc}
								onChange={handleSortOrderChange}
							/>
							<Form.Check
								inline
								type="radio"
								label="Desc"
								name="sortOrderOptions"
								id="desc"
								checked={!sortAsc}
								onChange={handleSortOrderChange}
							/>
						</Form.Group>
					</fieldset>
				</Form>
			</div>
			<EventTable events={events} sortParam={sortParam} sortAsc={sortAsc} />
		</>
	);
}
