import React, { useEffect, useState } from "react";
import MainNav from "../components/MainNav";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useData } from "../context/DataProvider";
import EditForm from "../components/EditForm";

export default function EditEvent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data } = useData();
    const event = data.events.find(e => e.id === id);
    const attendeesForEvent = data.attendees.filter(attendee => attendee.eventId === id);

    const handleBack = () => {
        navigate(`/events/${id}`);
    };

    return (
        <>
            <MainNav />
            <div className="container mt-4">
                <h2>Editing: {event?.name}</h2>
                <EditForm event={event} attendees={attendeesForEvent} />
                <Button type="submit" onSubmit={handleBack}>Save All</Button>
                <NavLink to={`/events/${id}`} className="btn btn-secondary mt-3">
                    Back
                </NavLink>
            </div>
        </>
    );
}
