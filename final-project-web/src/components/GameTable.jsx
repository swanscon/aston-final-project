import { useState } from "react";
import { Table, Pagination } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { sortByField } from "../utils/SortByField";

export default function GameTable({ games, sortParam }) {
	const [pageNum, setPageNum] = useState(1);
	const gamesPerPage = 25;

    const sortedGames = sortByField(games, sortParam);

	const indexOfLastGame = pageNum * gamesPerPage;
	const indexOfFirstGame = indexOfLastGame - gamesPerPage;
	const currentGames = sortedGames.slice(indexOfFirstGame, indexOfLastGame);

	const totalPages = Math.ceil(games.length / gamesPerPage);

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

	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Game Name</th>
                        <th>Type</th>
						<th>Image File</th>
						<th>Description</th>
                        <th>Links</th>
					</tr>
				</thead>
				<tbody>
					{currentGames.map((game, index) => (
						<tr key={game.id || index}>
							<td>{game.name}</td>
                            <td>{game.gameType.name}</td>
							<td>{game.image}</td>
							<td>{game.description}</td>
                            <td>
                                <NavLink to="#" style={{textDecoration: 'none'}}>View </NavLink>
                                <NavLink to="#" style={{textDecoration: 'none'}}>Edit </NavLink>
                                <NavLink to="#" style={{textDecoration: 'none'}}>Delete</NavLink>
                            </td>
						</tr>
					))}
				</tbody>
			</Table>
			<Pagination>{paginationItems}</Pagination>
		</>
	);
}
