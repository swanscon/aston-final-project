import { useEffect, useState } from "react";
import { Table, Pagination } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { sortByField } from "../utils/SortByField";
import { handleDateFormat } from "../utils/HandleDateFormat";

export default function EventTable({ events, sortParam }) {
	const [pageNum, setPageNum] = useState(1);
    const [games, setGames] = useState([]);
	const eventsPerPage = 25;

	const sortedEvents = sortByField(events, sortParam);

	const indexOfLastEvent = pageNum * eventsPerPage;
	const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
	const currentEvents = sortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);

	const totalPages = Math.ceil(events.length / eventsPerPage);

	const paginationItems = [];
	for (let number = 1; number <= totalPages; number++) {
		paginationItems.push(
			<Pagination.Item
				key={number}
				active={number === pageNum}
				onClick={() => setPageNum(number)}
			>
				{number}
			</Pagination.Item>
		);
	}

    useEffect(() => {
        fetch("http://localhost:8181/api/game")
            .then(response => response.json())
            .then(data => {
                const loadedGames = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key],
                }));
                setGames(loadedGames);
            })
            .catch(error => console.log(error));
    }, []);

    const handleGameNameFromId = (gameId) => {
        const game = games.find(game => game.id === gameId);
        return game ? game.name : "n/a";
    };

	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Event Name</th>
						<th>Game</th>
						<th>Date</th>
						<th>Duration</th>
                        <th>Attendees</th>
						<th>Links</th>
					</tr>
				</thead>
				<tbody>
					{currentEvents.map((event, index) => (
						<tr key={event.id || index}>
							<td>{event.name}</td>
							<td>{handleGameNameFromId(event.gameId)}</td>
							<td>{handleDateFormat(event.eventDate)}</td>
							<td>{event.duration}</td>
                            <td>{event.attendeeCount}</td>
							<td>
								<NavLink to="#" style={{ textDecoration: "none" }}>
									View{" "}
								</NavLink>
								<NavLink to="#" style={{ textDecoration: "none" }}>
									Edit{" "}
								</NavLink>
								<NavLink to="#" style={{ textDecoration: "none" }}>
									Delete
								</NavLink>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Pagination>{paginationItems}</Pagination>
		</>
	);
}
