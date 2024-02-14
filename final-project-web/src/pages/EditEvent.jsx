import { useState, useEffect } from "react";
import MainNav from "../components/MainNav";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import EditForm from "../components/EditForm";
import MainFooter from "../components/MainFooter";

export default function EditEvent() {
    let { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [eventDetails, setEventDetails] = useState({
        id: "",
        gameId: "",
        name: "",
        eventDate: "",
        duration: "",
        description: "",
    });
    const [attendees, setAttendees] = useState([]);
    const [delAttendees, setDelAttendees] = useState([]);

    useEffect(() => {
        setIsLoading(true);

        const fetchEvent = fetch(`http://localhost:8182/api/event/${id}`).then(
            (response) => {
                if (!response.ok)
                    throw new Error("Event could not be fetched!");
                return response.json();
            }
        );

        fetchEvent
            .then((eventData) => {
                return fetch(`http://localhost:8183/api/attendee/event/${id}`)
                    .then((response) => response.json())
                    .then((attendeesData) => {
                        const loadedAttendees = Object.keys(attendeesData).map(
                            (key) => ({
                                id: key,
                                ...attendeesData[key],
                            })
                        );
                        setAttendees(loadedAttendees);
                        return eventData;
                    });
            })
            .then((eventData) => {
                setEventDetails(eventData);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    }, [id]);

    const navigate = useNavigate();

    const onEventChange = (updatedDetails) => {
        setEventDetails(updatedDetails);
    };

    const onAttendeesDel = (idToRemove) => {
        setDelAttendees((prevDelAttendees) => [
            ...prevDelAttendees,
            idToRemove,
        ]);
    };

    const onAttendeesChange = (updatedAttendees) => {
        setAttendees(updatedAttendees);
    };

    const handleSubmit = async () => {
        try {
            // Update event
            const eventResponse = await fetch(
                `http://localhost:8182/api/event/${eventDetails.id}`,
                {
                    method: "PUT",
                    body: JSON.stringify(eventDetails),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!eventResponse.ok) {
                throw new Error("Failed to update the event");
            }
            // eslint-disable-next-line
            const eventData = eventResponse; // For Logging

            // Update (or Add) attendees
            for (const attendee of attendees) {
                if (
                    attendee.id < 0 &&
                    (attendee.firstName.length !== 0 ||
                        attendee.lastName.length !== 0)
                ) {
                    const attendeeResponse = await fetch(
                        "http://localhost:8183/api/attendee",
                        {
                            method: "POST",
                            body: JSON.stringify(attendee),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    if (!attendeeResponse.ok) {
                        throw new Error("Failed to add new attendee");
                    }
                    // eslint-disable-next-line
                    const attendeeData = attendeeResponse; // For Logging
                } else {
                    const attendeeResponse = await fetch(
                        `http://localhost:8183/api/attendee/${attendee.id}`,
                        {
                            method: "PUT",
                            body: JSON.stringify(attendee),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    if (!attendeeResponse.ok) {
                        throw new Error("Failed to update the attendee");
                    }
                    // eslint-disable-next-line
                    const attendeeData = attendeeResponse; // For Logging

                    // Update status
                    const statusResponse = await fetch(
                        `http://localhost:8183/api/attendee/${attendee.id}/${attendee.status}`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    if (!statusResponse.ok) {
                        throw new Error("Failed to update attendee status");
                    }
                    // eslint-disable-next-line
                    const statusData = statusResponse; // For Logging
                }
            }
            // Delete attendees
            for (const delId of delAttendees) {
                if (delId > 0) {
                    const deleteResponse = await fetch(
                        `http://localhost:8183/api/attendee/${delId}`,
                        {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    if (!deleteResponse.ok) {
                        throw new Error("Failed to delete the attendee");
                    }
                    // eslint-disable-next-line
                    const deleteData = deleteResponse; // For Logging
                }
            }
        } catch (error) {
            console.error("Failed to update event and attendees", error);
        }
        navigate(`/events/${id}`);
    };

    return (
        <>
            <MainNav />
            {isLoading ? (
                <>
                    <h1>My Events</h1>
                    <p>Loading data...</p>
                </>
            ) : (
                <div className="container mt-4">
                    <h2>Editing: {eventDetails.name}</h2>
                    <EditForm
                        eventDetails={eventDetails}
                        onEventChange={onEventChange}
                        attendees={attendees}
                        onAttendeesChange={onAttendeesChange}
                        delAttendees={delAttendees}
                        onAttendeesDel={onAttendeesDel}
                    />
                    <Button type="submit" onClick={handleSubmit}>
                        Save All
                    </Button>
                    <div>
                        <NavLink
                            to={`/events/${id}`}
                            className="btn btn-secondary mt-3"
                        >
                            Back
                        </NavLink>
                    </div>
                </div>
            )}
            <MainFooter />
        </>
    );
}
