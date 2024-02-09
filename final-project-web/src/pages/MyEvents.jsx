import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import MainNav from "../components/MainNav";
import { useEffect, useState } from "react";
import DummyData from "../utils/DummyData";

export default function MyEvents() {
	const [loadedEvents, setLoadedEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const data = DummyData();
        setLoadedEvents(data.events);
        setIsLoading(false);
    }, []);

    function handleDateFormat(formattableDate) {
        const date = new Date(formattableDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
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
                            {loadedEvents.map((event) => (
                                <li key={event.id}>
                                    {event.name} - {handleDateFormat(event.eventDate)}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </>
	);
}
