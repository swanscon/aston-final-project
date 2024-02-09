import React from 'react';
import { Button, Form } from 'react-bootstrap';

export default function AttendeeForm({ attendees, onAttendeesChange }) {
    // Function to handle adding a new attendee
    const handleAddAttendee = () => {
        if (attendees.length < 25) {
            const newAttendees = [...attendees, { firstName: '', lastName: '' }];
            onAttendeesChange(newAttendees);
        }
    };

    // Function to handle updating an existing attendee
    const handleAttendeeChange = (index, field, value) => {
        const newAttendees = attendees.map((attendee, i) =>
            i === index ? { ...attendee, [field]: value } : attendee
        );
        onAttendeesChange(newAttendees);
    };

    // Function to render attendee input fields
    const renderAttendeeInputs = () => {
        return attendees.map((attendee, index) => (
            <div key={index} className="mb-3">
                <Form.Control
                    className="mb-2"
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={attendee.firstName}
                    onChange={(e) => handleAttendeeChange(index, 'firstName', e.target.value)}
                />
                <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={attendee.lastName}
                    onChange={(e) => handleAttendeeChange(index, 'lastName', e.target.value)}
                />
            </div>
        ));
    };

    return (
        <>
            {renderAttendeeInputs()}
            <Button variant="secondary" onClick={handleAddAttendee} disabled={attendees.length >= 25}>
                Add More Attendees
            </Button>
        </>
    );
}
