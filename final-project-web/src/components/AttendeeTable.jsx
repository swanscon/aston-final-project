import { useState, useEffect } from "react";
import { Table, Pagination, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { sortByField } from "../utils/SortByField";

export default function AttendeeTable({ attendees, sortParam, sortAsc, setRefresh }) {
	const [pageNum, setPageNum] = useState(1);
	const [events, setEvents] = useState([]);
	const [deleting, setDeleting] = useState(null);
	const attendeesPerPage = 25;

	const handleEventNameFromId = (eventId) => {
		const event = events.find((event) => event.id === eventId);
		return event ? event.name : "n/a";
	};

	const sortAttendeesByEventName = (attendees, sortAsc) => {
		return [...attendees].sort((a, b) => {
			const eventNameA = handleEventNameFromId(a.eventId);
			const eventNameB = handleEventNameFromId(b.eventId);
			if (sortAsc) {
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

	const handleToggleDeleting = (id) => {
		setDeleting(deleting === id ? null : id);
	};

	const handleDelete = async (attendeeId) => {
		try {
			const deleteReponse = await fetch(`http://localhost:8183/api/attendee/${attendeeId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!deleteReponse.ok) {
				throw new Error("Failed to delete attendee");
			}
			setDeleting(null);
			setRefresh((prevState) => !prevState);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Event</th>
						<th>First</th>
						<th>Last</th>
						<th>Status</th>
						<th>Links</th>
					</tr>
				</thead>
				<tbody>
					{currentAttendees.map((attendee, index) => (
						<tr key={attendee.id || index}>
							<td>{handleEventNameFromId(attendee.eventId)}</td>
							<td>{attendee.firstName}</td>
							<td>{attendee.lastName}</td>
							<td>{attendee.status}</td>
							<td>
								<NavLink
									to={`/admin/attendee/${attendee.id}`}
									style={{ textDecoration: "none" }}
								>
									Edit{" "}
								</NavLink>
								<p
									to="#"
									style={{
										textDecoration: "none",
										cursor: "pointer",
										color: "blue",
									}}
									onClick={() => handleToggleDeleting(attendee.id)}
								>
									Delete
								</p>
								{deleting === attendee.id ? (
									<>
										<p>Are you sure?</p>
										<Button onClick={() => handleDelete(attendee.id)}>
											YES
										</Button>
										<Button onClick={() => handleToggleDeleting(attendee.id)}>
											NO
										</Button>
									</>
								) : (
									<></>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Pagination>{paginationItems}</Pagination>
		</>
	);
}
