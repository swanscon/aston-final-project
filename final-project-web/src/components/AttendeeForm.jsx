import React from "react";
import { Button, Form } from "react-bootstrap";

export default function AttendeeForm({ attendees, onAttendeesChange }) {
    const handleAddAttendee = () => {
        if (attendees.length < 25) {
            const newAttendees = [
                ...attendees,
                { firstName: "", lastName: "" },
            ];
            onAttendeesChange(newAttendees);
        }
    };

    const handleRemoveAttendee = (index) => {
        const newAttendees = attendees.filter((_, i) => i !== index);
        onAttendeesChange(newAttendees);
    };

    const handleAttendeeChange = (index, field, value) => {
        const newAttendees = attendees.map((attendee, i) =>
            i === index ? { ...attendee, [field]: value } : attendee
        );
        onAttendeesChange(newAttendees);
    };

    const renderAttendeeInputs = () => {
        return attendees.map((attendee, index) => (
            <div key={index} className="mb-3">
                <Form.Control
                    className="mb-2"
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={attendee.firstName}
                    onChange={(e) =>
                        handleAttendeeChange(index, "firstName", e.target.value)
                    }
                />
                <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={attendee.lastName}
                    onChange={(e) =>
                        handleAttendeeChange(index, "lastName", e.target.value)
                    }
                />
                {index === attendees.length - 1 ? (
                    <Button
                        variant="success"
                        onClick={handleAddAttendee}
                        disabled={attendees.length >= 25}
                        className="me-2"
                    >
                        +
                    </Button>
                ) : (
                    <Button
                        variant="danger"
                        onClick={() => handleRemoveAttendee(index)}
                        className="me-2"
                    >
                        -
                    </Button>
                )}
            </div>
        ));
    };

    return <>{renderAttendeeInputs()}</>;
}
