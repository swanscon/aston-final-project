import { useState, useEffect } from "react";
import AttendeeTable from "../components/AttendeeTable";
import { NavLink } from "react-router-dom";
import AdminSearch from "../components/AdminSearch";
import { Form, Button } from "react-bootstrap";

export default function AdminAttendee() {
	const [attendees, setAttendees] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [sortParam, setSortParam] = useState("eventId");
	const [sortAsc, setSortAsc] = useState(true);
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
			fetch("http://localhost:8183/api/attendee")
				.then((response) => {
					if (!response.ok) {
						throw new Error("Failed to fetch attendees");
					}
					return response.json();
				})
				.then((data) => {
					const loadedAttendees = Object.keys(data)
						.map((key) => ({
							id: key,
							...data[key],
						}))
						.filter(
							(attendee) =>
								searchText === "" ||
								attendee.firstName
									.toUpperCase()
									.includes(searchText.toUpperCase()) ||
								attendee.lastName.toUpperCase().includes(searchText.toUpperCase())
						);
					setAttendees(loadedAttendees);
				})
				.catch((error) => {
					console.error(error);
				});
			if (refresh) {
				setRefresh(false);
			}
	}, [searchText, refresh]);

	const handleSortBy = (e) => {
		setSortParam(e.target.value);
	};

	const handleSortOrderChange = (e) => {
		setSortAsc(e.target.id === "asc");
	};

	return (
		<>
			<h2>Attendee Management</h2>
			{/* CRUD Links here */}
			<div>
				<NavLink to="#">
					<Button>Create a New Attendee</Button>
				</NavLink>
			</div>
			<NavLink to="/admin">Back</NavLink>
			<AdminSearch onSearch={setSearchText} />
			<div>
				<Form>
					<Form.Group controlId="sortBySelect">
						<Form.Label>Sort By: </Form.Label>
						<Form.Select aria-label="Sort by" onChange={handleSortBy} value={sortParam}>
							<option value="eventId">Event</option>
							<option value="firstName">First Name</option>
							<option value="lastName">Last Name</option>
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
			<AttendeeTable
				attendees={attendees}
				sortParam={sortParam}
				sortAsc={sortAsc}
				setRefresh={setRefresh}
			/>
		</>
	);
}
