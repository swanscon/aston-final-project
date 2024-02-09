import React, { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useData } from "../context/DataProvider"; // Assuming this is your context import

const EventForm = ({eventDetails, handleChange, onEventChange}) => {
    const { data } = useData(); // Correctly access data from context

    // Ensure there's a fallback for games and gameTypes if they're potentially undefined
    const games = data.games || [];
    const gameTypes = data.gameTypes || [];

    return (
        <Form>
            <Form.Group>
                <Form.Label>Select Game</Form.Label>
                <Form.Select
                    value={eventDetails.gameId}
                    onChange={(e) => handleChange("gameId", e.target.value)}
                >
                    <option value="">Select a game...</option>
                    {gameTypes.map((type) => (
                        <optgroup label={type.name} key={type.id}>
                            {games
                                .filter(game => game.gameTypeRequest.id === type.id)
                                .map(game => (
                                    <option value={game.id} key={game.id}>
                                        {game.name}
                                    </option>
                                ))}
                        </optgroup>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEventName">
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter event name"
                    value={eventDetails.name || ''}
                    onChange={(e) => handleChange("name", e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEventDate">
                <Form.Label>Event Date</Form.Label>
                <DatePicker
                    selected={new Date(eventDetails.eventDate)}
                    onChange={(date) => handleChange("eventDate", date)}
                    className="form-control"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEventDuration">
                <Form.Label>Duration</Form.Label>
                <div className="d-flex">
                    <Form.Select
                        aria-label="Duration hours"
                        value={eventDetails.durationHours}
                        onChange={(e) =>
                            handleChange("durationHours", e.target.value)
                        }
                        className="me-2"
                    >
                        {[...Array(24).keys()].map((hour) => (
                            <option key={hour} value={hour}>
                                {hour} Hour(s)
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Select
                        aria-label="Duration minutes"
                        value={eventDetails.durationMinutes}
                        onChange={(e) =>
                            handleChange("durationMinutes", e.target.value)
                        }
                    >
                        {["00", "15", "30", "45"].map((minute) => (
                            <option key={minute} value={minute}>
                                {minute} Minute(s)
                            </option>
                        ))}
                    </Form.Select>
                </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEventDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter event description"
                    value={eventDetails.description}
                    onChange={(e) =>
                        handleChange("description", e.target.value)
                    }
                />
            </Form.Group>

            {/* This button is illustrative; the actual submission might be handled at a higher level */}
            <Button variant="primary" type="button" onClick={() => handleChange('submit')}>
                Submit
            </Button>
        </Form>
    );
};

export default EventForm;
