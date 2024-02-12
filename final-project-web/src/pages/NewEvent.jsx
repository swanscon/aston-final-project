import React, { useState } from "react";
import { Button } from "react-bootstrap";
import MainNav from "../components/MainNav";
import EventForm from "../components/EventForm";
import AttendeeForm from "../components/AttendeeForm";
import { useData } from "../context/DataProvider"; // Assuming this is your context

export default function NewEvent() {
	const { data, setData } = useData(); // Use context if needed
	const [eventDetails, setEventDetails] = useState({
		id: "",
		gameId: "",
		name: "",
		eventDate: new Date(),
		duration: "",
		description: "",
	});
	const [attendees, setAttendees] = useState([{ firstName: "", lastName: "" }]);

	const handleSubmit = () => {
		console.log(eventDetails, attendees);
	};

	return (
		<>
			<MainNav />
			<div style={{ border: "solid orange 2px" }}>
				<h1>Create New Event</h1>
				<EventForm eventDetails={eventDetails} onEventChange={setEventDetails} />
				<AttendeeForm attendees={attendees} onAttendeesChange={setAttendees} />
				<div>
					<Button onClick={handleSubmit}>Submit</Button>
				</div>
			</div>
		</>
	);
}
