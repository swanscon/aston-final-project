import { useState } from "react";
import { Table, Pagination, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { sortByField } from "../utils/SortByField";

export default function GameTable({ games, sortParam, sortAsc, setRefresh }) {
	const [pageNum, setPageNum] = useState(1);
	const [deleting, setDeleting] = useState(null);
	const gamesPerPage = 25;

	const sortedGames = sortByField(games, sortParam, sortAsc);

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

	const handleToggleDeleting = (id) => {
		setDeleting(deleting === id ? null : id);
	};

	const handleDelete = async (gameId) => {
		try {
			const deleteReponse = await fetch(`http://localhost:8181/api/game/${gameId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!deleteReponse.ok) {
				throw new Error("Failed to delete game");
			}
			setDeleting(null);
			setRefresh((prevState) => !prevState);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Name</th>
						<th>Game Type</th>
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
							<td>
								<NavLink to="#" target="_blank">
									{game.image}
								</NavLink>
							</td>
							<td>{game.description}</td>
							<td>
								<NavLink
									to={`/admin/game/${game.id}`}
									style={{ textDecoration: "none" }}
								>
									Edit{" "}
								</NavLink>
								<p
									to="#"
									style={{
										textDecoration: "none",
										cursor: "pointer",
										color: "blue",
									}}
									onClick={() => handleToggleDeleting(game.id)}
								>
									Delete
								</p>
								{deleting === game.id ? (
									<>
										<p>Are you sure?</p>
										<Button onClick={() => handleDelete(game.id)}>
											YES
										</Button>
										<Button onClick={() => handleToggleDeleting(game.id)}>
											NO
										</Button>
									</>
								) : (
									<></>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Pagination>{paginationItems}</Pagination>
		</>
	);
}
