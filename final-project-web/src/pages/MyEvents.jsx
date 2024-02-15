import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import MainNav from "../components/MainNav";
import { useEffect, useState } from "react";
import MainFooter from "../components/MainFooter";
import { handleDateFormat } from "../utils/HandleDateFormat";

export default function MyEvents() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:8182/api/event")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const loadedEvents = [];
                for (const key in data) {
                    const event = {
                        id: key,
                        ...data[key],
                    };
                    loadedEvents.push(event);
                }
                setIsLoading(false);
                setEvents(loadedEvents);
            });
    }, []);

    return (
        <>
            <MainNav />
            <div style={{ border: "solid orange 2px" }}>
                {isLoading ? (
                    <>
                        <h1>My Events</h1>
                        <p>Loading data...</p>
                    </>
                ) : (
                    <>
                        <h1>My Events</h1>
                        <NavLink to="/events/new">
                            <Button style={{ cursor: "pointer" }}>
                                Create a New Event
                            </Button>
                        </NavLink>
                        <ul style={{ listStyle: "none" }}>
                            {events.map((event) => (
                                <NavLink
                                    to={`/events/${event.id}`}
                                    key={event.id}
                                >
                                    <li>
                                        {event.name} -{" "}
                                        {handleDateFormat(event.eventDate)}
                                    </li>
                                </NavLink>
                            ))}
                        </ul>
                    </>
                )}
            </div>
            <MainFooter />
        </>
    );
}
