import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import MainNav from "../components/MainNav";
import { useEffect, useState } from "react";
import MainFooter from "../components/MainFooter";

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

    function handleDateFormat(formattableDate) {
        const date = new Date(formattableDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return month + "-" + day + "-" + year;
    }

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
