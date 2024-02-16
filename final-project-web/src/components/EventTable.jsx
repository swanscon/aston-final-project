import { useEffect, useState } from "react";
import { Table, Pagination } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { sortByField } from "../utils/SortByField";
import { handleDateFormat } from "../utils/HandleDateFormat";

export default function EventTable({ events, sortParam, sortAsc }) {
	const [pageNum, setPageNum] = useState(1);
	const [games, setGames] = useState([]);
	const eventsPerPage = 25;

	const handleGameNameFromId = (gameId) => {
		const game = games.find((game) => game.id === gameId);
		return game ? game.name : "n/a";
	};

	const sortEventsByGameName = (events, sortAsc) => {
		return [...events].sort((a, b) => {
			const gameNameA = handleGameNameFromId(a.gameId);
			const gameNameB = handleGameNameFromId(b.gameId);
			if (sortAsc) {
				return gameNameA.localeCompare(gameNameB);
			} else {
				return gameNameB.localeCompare(gameNameA);
			}
		});
	};

	const sortedEvents =
		sortParam !== "gameId"
			? sortByField(events, sortParam, sortAsc)
			: sortEventsByGameName(events, sortAsc);

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
			.then((response) => response.json())
			.then((data) => {
				const loadedGames = Object.keys(data).map((key) => ({
					id: key,
					...data[key],
				}));

				setGames(loadedGames);
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Event Name</th>
						<th>Game</th>
						<th>Date</th>
						<th>Start Time</th>
						<th>End Time</th>
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
							<td>{event.startTime}</td>
							<td>{event.endTime}</td>
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
