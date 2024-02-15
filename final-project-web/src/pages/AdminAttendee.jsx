import { useState, useEffect } from "react";
import AttendeeTable from "../components/AttendeeTable";
import { NavLink } from "react-router-dom";
import AdminSearch from "../components/AdminSearch";
import { Form, Button } from "react-bootstrap";

export default function AdminAttendee() {
	const [attendees, setAttendees] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [sortParam, setSortParam] = useState("");

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
							attendee.firstName.toUpperCase().includes(searchText.toUpperCase()) ||
							attendee.lastName.toUpperCase().includes(searchText.toUpperCase())
					);
				setAttendees(loadedAttendees);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [searchText]);

	const handleSortBy = (e) => {
		setSortParam(e.target.value);
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
					<Form.Label>Sort By: </Form.Label>
					<Form.Check
						inline
						type="radio"
						label="Event"
						name="sortOptions"
						value="eventId"
						checked={sortParam === "eventId"}
						onChange={handleSortBy}
					/>
					<Form.Check
						inline
						type="radio"
						label="First"
						name="sortOptions"
						value="firstName"
						checked={sortParam === "firstName"}
						onChange={handleSortBy}
					/>
					<Form.Check
						inline
						type="radio"
						label="Last"
						name="sortOptions"
						value="lastName"
						checked={sortParam === "lastName"}
						onChange={handleSortBy}
					/>
				</Form>
			</div>
			<AttendeeTable attendees={attendees} sortParam={sortParam} />
		</>
	);
}
