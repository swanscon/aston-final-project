import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import MainNav from '../components/MainNav';
import EventForm from '../components/EventForm';
import AttendeeForm from '../components/AttendeeForm';
import { useData } from '../context/DataProvider'; // Assuming this is your context

export default function NewEvent() {
    const { data, setData } = useData(); // Use context if needed
    const [eventDetails, setEventDetails] = useState({
        selectedGame: '',
        name: '',
        eventDate: new Date(),
        durationHours: '00',
        durationMinutes: '00',
        description: '',
    });
    const [attendees, setAttendees] = useState([{ firstName: '', lastName: '' }]);

    const handleSubmit = () => {
        // Logic to submit eventDetails and attendees to your backend or context
        console.log(eventDetails, attendees);
        // Update context or make API call here
    };

    return (
        <>
            <MainNav />
            <div style={{ border: 'solid orange 2px' }}>
                <h1>Create New Event</h1>
                {/* Pass eventDetails and setter as props */}
                <EventForm eventDetails={eventDetails} onEventChange={setEventDetails} />
                {/* Pass attendees and setter as props */}
                <AttendeeForm attendees={attendees} onAttendeesChange={setAttendees} />
                <Button onClick={handleSubmit}>Submit Event and Attendees</Button>
            </div>
        </>
    );
}
