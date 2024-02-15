import { useState } from "react";
import { Table, Pagination } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { sortByField } from "../utils/SortByField";

export default function AttendeeTable({ attendees, sortParam }) {
    const [pageNum, setPageNum] = useState(1);
	const attendeesPerPage = 25;

    const sortedAttendees = sortByField(attendees, sortParam);

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

	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Event ID</th>
                        <th>First</th>
						<th>Last</th>
                        <th>Links</th>
					</tr>
				</thead>
				<tbody>
					{currentAttendees.map((attendee, index) => (
						<tr key={attendee.id || index}>
							<td>{attendee.eventId}</td>
                            <td>{attendee.firstName}</td>
							<td>{attendee.lastName}</td>
                            <td>
                                <NavLink to="#" style={{textDecoration: 'none'}}>View </NavLink>
                                <NavLink to="#" style={{textDecoration: 'none'}}>Edit </NavLink>
                                <NavLink to="#" style={{textDecoration: 'none'}}>Delete</NavLink>
                            </td>
						</tr>
					))}
				</tbody>
			</Table>
			<Pagination>{paginationItems}</Pagination>
		</>
	);
}