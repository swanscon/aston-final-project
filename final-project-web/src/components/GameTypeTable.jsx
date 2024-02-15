import { useState } from "react";
import { Table, Pagination } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { sortByName } from "../utils/SortByName";

export default function GameTypeTable({ gameTypes }) {
	const [pageNum, setPageNum] = useState(1);
	const gameTypesPerPage = 25;

    const sortedGameTypes = sortByName(gameTypes);

	const indexOfLastGame = pageNum * gameTypesPerPage;
	const indexOfFirstGame = indexOfLastGame - gameTypesPerPage;
	const currentgameTypes = sortedGameTypes.slice(indexOfFirstGame, indexOfLastGame);

	const totalPages = Math.ceil(gameTypes.length / gameTypesPerPage);

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
						<th>Game Type Name</th>
                        <th>Links</th>
					</tr>
				</thead>
				<tbody>
					{currentgameTypes.map((gameType, index) => (
						<tr key={gameType.id || index}>
							<td>{gameType.name}</td>
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
