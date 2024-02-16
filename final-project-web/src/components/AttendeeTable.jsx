import { useState, useEffect } from "react";
import { Table, Pagination } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { sortByField } from "../utils/SortByField";

export default function AttendeeTable({ attendees, sortParam, sortAsc }) {
	const [pageNum, setPageNum] = useState(1);
	const [events, setEvents] = useState([]);
	const attendeesPerPage = 25;

	const handleEventNameFromId = (eventId) => {
		const event = events.find((event) => event.id === eventId);
		return event ? event.name : "n/a";
	};

	const sortAttendeesByEventName = (attendees, sortAsc) => {
		return [...attendees].sort((a, b) => {
			const eventNameA = handleEventNameFromId(a.eventId);
			const eventNameB = handleEventNameFromId(b.eventId);
			if(sortAsc) {
				return eventNameA.localeCompare(eventNameB);
			} else {
				return eventNameB.localeCompare(eventNameA);
			}
		});
	};

	const sortedAttendees =
		sortParam !== "eventId"
			? sortByField(attendees, sortParam, sortAsc)
			: sortAttendeesByEventName(attendees, sortAsc);

	const indexOfLastAttendee = pageNum * attendeesPerPage;
	const indexOfFirstAttendee = indexOfLastAttendee - attendeesPerPage;
	const currentAttendees = sortedAttendees.slice(indexOfFirstAttendee, indexOfLastAttendee);

	const totalPages = Math.ceil(attendees.length / attendeesPerPage);

	const paginationItems = [];
	for (let number = 1; number <= totalPages; number++) {
		paginationItems.push(
			<Pagination.Item
				key={number}
				active={number === pageNum}
				onClick={() => setPageNum(number)}
			>
				{number}
			</Pagination.Item>
		);
	}

	useEffect(() => {
		fetch("http://localhost:8182/api/event")
			.then((response) => response.json())
			.then((data) => {
				const loadedEvents = Object.keys(data).map((key) => ({
					id: key,
					...data[key],
				}));

				setEvents(loadedEvents);
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Event</th>
						<th>First</th>
						<th>Last</th>
						<th>Links</th>
					</tr>
				</thead>
				<tbody>
					{currentAttendees.map((attendee, index) => (
						<tr key={attendee.id || index}>
							<td>{handleEventNameFromId(attendee.eventId)}</td>
							<td>{attendee.firstName}</td>
							<td>{attendee.lastName}</td>
							<td>
								<NavLink to="#" style={{ textDecoration: "none" }}>
									View{" "}
								</NavLink>
								<NavLink to="#" style={{ textDecoration: "none" }}>
									Edit{" "}
								</NavLink>
								<NavLink to="#" style={{ textDecoration: "none" }}>
									Delete
								</NavLink>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Pagination>{paginationItems}</Pagination>
		</>
	);
}
