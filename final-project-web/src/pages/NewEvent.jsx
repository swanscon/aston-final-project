import MainNav from "../components/MainNav";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import EventForm from "../components/EventForm";

export default function NewEvent() {
    return (
        <>
			<MainNav />
			<div style={{ border: "solid orange 2px" }}>
				<h1>My Events</h1>

				<NavLink to="/events">
					<Button style={{cursor: 'pointer'}}>Back</Button>
				</NavLink>

                <div>
                    <EventForm />
                </div>
				
			</div>
		</>
    )
}