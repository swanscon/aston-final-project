import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import MainNav from "../components/MainNav";
import EventForm from "../components/EventForm";
import AttendeeForm from "../components/AttendeeForm";
import { useData } from "../context/DataProvider";

export default function NewEvent() {
	const { data, setData } = useData();
	const [eventDetails, setEventDetails] = useState({
		id: "",
		gameId: "",
		name: "",
		eventDate: new Date(),
		duration: "",
		description: "",
	});
	const [attendees, setAttendees] = useState([{ id: "", firstName: "", lastName: "", status: "Pending" }]);

    const navigate = useNavigate();

    const handleFormFilled = () => {
        if( eventDetails.name.length > 0 &&
            eventDetails.gameId.length > 0) {
                handleSubmit();
            } else {
                alert("Event Name & Select Game fields required.");
            }
    }

	const handleSubmit = () => {
        const newEventId = String(Math.max(...data.events.map(e => parseInt(e.id, 10))) + 1);
    
        const newEvent = {
            ...eventDetails,
            id: newEventId,
            eventDate: eventDetails.eventDate.toISOString()
        };
    
        const newAttendees = attendees.map(attendee => ({
            ...attendee,
            id: String(Math.max(...data.attendees.map(a => parseInt(a.id, 10))) + 1),
            eventId: newEventId,
        }));
    
        setData(prevData => ({
            ...prevData,
            events: [...prevData.events, newEvent],
            attendees: [...prevData.attendees, ...newAttendees],
        }));

        navigate("/events");
    
    };

	return (
		<>
			<MainNav />
			<div style={{ border: "solid orange 2px" }}>
				<h1>Create New Event</h1>
				<EventForm eventDetails={eventDetails} onEventChange={setEventDetails} />
				<AttendeeForm attendees={attendees} onAttendeesChange={setAttendees} />
				<div>
					<Button onClick={handleFormFilled}>Submit</Button>
				</div>
			</div>
		</>
	);
}
