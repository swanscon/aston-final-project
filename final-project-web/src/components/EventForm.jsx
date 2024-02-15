import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { sortByField } from "../utils/SortByField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EventForm = ({ eventDetails, onEventChange }) => {
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [games, setGames] = useState([]);
    const [gameTypes, setGameTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:8181/api/game")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const loadedGames = [];
                for (const key in data) {
                    const game = {
                        id: key,
                        ...data[key],
                    };
                    loadedGames.push(game);
                }
                sortByField(loadedGames, 'name');
                setIsLoading(false);
                setGames(loadedGames);
            });
        setIsLoading(true);
        fetch("http://localhost:8181/api/game/type")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const loadedGameTypes = [];
                for (const key in data) {
                    const gameType = {
                        id: key,
                        ...data[key],
                    };
                    loadedGameTypes.push(gameType);
                }
                sortByField(loadedGameTypes, 'name');
                setIsLoading(false);
                setGameTypes(loadedGameTypes);
            });
    }, []);

    const handleDurationFormat = (hh, mm) => {
        const numHours = Number.parseInt(hh);
        const numMinutes = Number.parseInt(mm);
        let hours = "";
        if (numHours > 0) {
            hours += numHours + " hour";
            if (numHours > 1) {
                hours += "s";
            }
        }
        let minutes = "";
        if (numMinutes > 0) {
            minutes += numMinutes + " minutes";
        }
        if (numHours === 0 && numMinutes === 0) {
            return "None";
        } else {
            return hours + " " + minutes;
        }
    };

    const handleDateChange = (date) => {
        onEventChange({
            ...eventDetails,
            eventDate: date,
        });
    };

    const handleChange = (e) => {
        if (e.target.name === "hours" || e.target.name === "minutes") {
            const newHours = e.target.name === "hours" ? e.target.value : hours;
            const newMinutes =
                e.target.name === "minutes" ? e.target.value : minutes;

            if (e.target.name === "hours") {
                setHours(newHours);
            } else if (e.target.name === "minutes") {
                setMinutes(newMinutes);
            }
            const duration = handleDurationFormat(newHours, newMinutes);
            onEventChange({
                ...eventDetails,
                duration: duration,
            });
        } else {
            onEventChange({
                ...eventDetails,
                [e.target.name]: e.target.value,
            });
        }
    };

    return (
        <>
            {isLoading ? (
                <>
                    <h1>My Events</h1>
                    <p>Loading data...</p>
                </>
            ) : (
                <Form>
                    <Form.Group className="mb-3" controlId="formEventName">
                        <Form.Label>Event Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter event name"
                            name="name"
                            value={eventDetails.name || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Select Game</Form.Label>
                        <Form.Select
                            name="gameId"
                            value={eventDetails.gameId}
                            onChange={handleChange}
                        >
                            <option value="">Select a game...</option>
                            {gameTypes.map((type) => (
                                <optgroup label={type.name} key={type.id}>
                                    {games
                                        .filter(
                                            (game) =>
                                                game.gameType.id === type.id
                                        )
                                        .map((game) => (
                                            <option
                                                value={game.id}
                                                key={game.id}
                                            >
                                                {game.name}
                                            </option>
                                        ))}
                                </optgroup>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEventDate">
                        <Form.Label>Event Date</Form.Label>
                        <DatePicker
                            selected={
                                eventDetails.eventDate
                                    ? new Date(eventDetails.eventDate)
                                    : null
                            }
                            onChange={handleDateChange}
                            className="form-control"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEventDuration">
                        <Form.Label>Duration</Form.Label>
                        <div className="d-flex">
                            <Form.Select
                                aria-label="Duration hours"
                                name="hours"
                                value={hours}
                                onChange={handleChange}
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
                                name="minutes"
                                value={minutes}
                                onChange={handleChange}
                            >
                                {["00", "15", "30", "45"].map((minute) => (
                                    <option key={minute} value={minute}>
                                        {minute} Minute(s)
                                    </option>
                                ))}
                            </Form.Select>
                        </div>
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="formEventDescription"
                    >
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter event description"
                            name="description"
                            value={eventDetails.description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            )}
        </>
    );
};

export default EventForm;
