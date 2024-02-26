import React from "react";
import { Button, Card, Form, Row, Col } from "react-bootstrap";

export default function AttendeeForm({ attendees, onAttendeesChange }) {
	const handleAddAttendee = () => {
		if (attendees.length < 25) {
			const newAttendees = [...attendees, { firstName: "", lastName: "" }];
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
		return (
			<Card>
				<Card.Body>
					<Card.Title>Attendees</Card.Title>
					{attendees.map((attendee, index) => (
						<Row key={index} className="mb-3">
                            <Col>
							<Form.Control
								type="text"
								placeholder="First Name"
								name="firstName"
								value={attendee.firstName}
								onChange={(e) =>
									handleAttendeeChange(index, "firstName", e.target.value)
								}
							/>
                            </Col>
                            <Col>
							<Form.Control
								type="text"
								placeholder="Last Name"
								name="lastName"
								value={attendee.lastName}
								onChange={(e) =>
									handleAttendeeChange(index, "lastName", e.target.value)
								}
							/>
                            </Col>
                            <Col xs="auto">
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
                            </Col>
						</Row>
					))}
				</Card.Body>
			</Card>
		);
	};

	return <>{renderAttendeeInputs()}</>;
}
