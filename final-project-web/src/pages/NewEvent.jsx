import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import MainNav from "../components/MainNav";
import EventForm from "../components/EventForm";
import AttendeeForm from "../components/AttendeeForm";
import MainFooter from "../components/MainFooter";

export default function NewEvent() {
    const [eventDetails, setEventDetails] = useState({
        id: "",
        gameId: "",
        name: "",
        eventDate: new Date(),
        startTime: "00:00:00",
        endTime: "00:00:00",
        description: "",
    });
    const [attendees, setAttendees] = useState([
        { firstName: "", lastName: "" },
    ]);

    const navigate = useNavigate();

    const handleFormFilled = () => {
        if (eventDetails.name.length > 0 && eventDetails.gameId.length > 0) {
            handleSubmit();
        } else {
            alert("Event Name & Select Game fields required.");
        }
    };

    const handleSubmit = async () => {
        const newEvent = {
            ...eventDetails,
            eventDate: eventDetails.eventDate.toISOString(),
        };

        try {
            const eventResponse = await fetch(
                "http://localhost:8182/api/event",
                {
                    method: "POST",
                    body: JSON.stringify(newEvent),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!eventResponse.ok) {
                throw new Error("Failed to create the event");
            }

            const eventData = await eventResponse.json();

            const newAttendees = attendees.map((attendee) => ({
                ...attendee,
                eventId: eventData.id,
            }));

            // Submit each attendee
            for (const attendee of newAttendees) {
                await fetch("http://localhost:8183/api/attendee", {
                    method: "POST",
                    body: JSON.stringify(attendee),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }

            navigate("/events");
        } catch (error) {
            console.error("Failed to submit new event and attendees", error);
        }
    };

    return (
        <>
            <MainNav />
            <div style={{ border: "solid orange 2px" }}>
                <h1>Create New Event</h1>
                <EventForm
                    eventDetails={eventDetails}
                    onEventChange={setEventDetails}
                />
                <AttendeeForm
                    attendees={attendees}
                    onAttendeesChange={setAttendees}
                />
                <div>
                    <Button onClick={handleFormFilled}>Submit</Button>
                </div>
            </div>
            <MainFooter />
        </>
    );
}
