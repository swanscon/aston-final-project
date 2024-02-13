import { useState } from "react";
import MainNav from "../components/MainNav";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useData } from "../context/DataProvider";
import EditForm from "../components/EditForm";

export default function EditEvent() {
	const { id } = useParams();
	const { data, setData } = useData();
	const event = data.events.find((e) => e.id === id);
	const [eventDetails, setEventDetails] = useState({
		id: event.id,
		gameId: event.gameId,
		name: event.name,
		eventDate: event.eventDate,
		duration: event.duration,
		description: event.description,
	});
	const [attendees, setAttendees] = useState(
		data.attendees.filter((attendee) => attendee.eventId === id)
	);

    const prevEvent = eventDetails;
    const prevAttendees = attendees;

	const navigate = useNavigate();

	const onEventChange = (updatedDetails) => {
		setEventDetails(updatedDetails);
	};

	const onAttendeesChange = (updatedAttendees) => {
		setAttendees(updatedAttendees);
	};

    const handleChangesMade = () => {
        if( eventDetails.name === prevEvent.name &&
            eventDetails.gameId === prevEvent.gameId &&
            eventDetails.duration === prevEvent.duration &&
            eventDetails.description === prevEvent.description &&
            prevAttendees === attendees) {
                alert("No changes detected. Please make a change or return to Event page");
        } else {
            handleSubmit();
        }
    }

	const handleSubmit = () => {
		const updatedEvent = {
			...eventDetails,
			eventDate: eventDetails.eventDate.toISOString(),
		};

		const updatedAttendees = attendees.map((attendee) => {
			if (attendee.id) {
				return attendee;
			} else {
				return {
					...attendee,
					id: String(Math.max(...data.attendees.map((a) => parseInt(a.id, 10))) + 1),
					eventId: id,
				};
			}
		});

		// Update Context API
		setData((prevData) => {
			const eventsUpdated = prevData.events.map((e) =>
				e.id === id ? updatedEvent : e
			);
			const attendeesUpdated = [
				...prevData.attendees.filter(
					(attendee) =>
						attendee.eventId !== id || attendees.map((a) => a.id).includes(attendee.id)
				),
				...updatedAttendees.filter(
					(attendee) => !attendee.id || attendees.map((a) => a.id).includes(attendee.id)
				),
			];

			return {
				...prevData,
				events: eventsUpdated,
				attendees: attendeesUpdated,
			};
		});
		navigate(`/events/${id}`);
	};

	return (
		<>
			<MainNav />
			<div className="container mt-4">
				<h2>Editing: {event?.name}</h2>
				<EditForm
					eventDetails={eventDetails}
					onEventChange={onEventChange}
					attendees={attendees}
					onAttendeesChange={onAttendeesChange}
				/>
				<Button type="submit" onClick={handleChangesMade}>
					Save All
				</Button>
				<div>
					<NavLink to={`/events/${id}`} className="btn btn-secondary mt-3">
						Back
					</NavLink>
				</div>
			</div>
		</>
	);
}
