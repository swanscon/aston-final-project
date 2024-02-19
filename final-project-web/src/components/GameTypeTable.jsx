import { useState } from "react";
import { Table, Pagination, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { sortByName } from "../utils/SortByName";

export default function GameTypeTable({ gameTypes, setRefresh }) {
	const [pageNum, setPageNum] = useState(1);
	const [deleting, setDeleting] = useState(null);
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

	const handleToggleDeleting = (id) => {
		setDeleting(deleting === id ? null : id);
	};

	const handleDelete = async (gameTypeId) => {
		try {
			const deleteReponse = await fetch(`http://localhost:8181/api/game/type/${gameTypeId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!deleteReponse.ok) {
				throw new Error("Failed to delete attendee");
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
						<th>Game Type Name</th>
						<th>Links</th>
					</tr>
				</thead>
				<tbody>
					{currentgameTypes.map((gameType, index) => (
						<tr key={gameType.id || index}>
							<td>{gameType.name}</td>
							<td>
								<NavLink
									to={`/admin/game-type/${gameType.id}`}
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
									onClick={() => handleToggleDeleting(gameType.id)}
								>
									Delete
								</p>
								{deleting === gameType.id ? (
									<>
										<p>Are you sure?</p>
										<Button onClick={() => handleDelete(gameType.id)}>
											YES
										</Button>
										<Button onClick={() => handleToggleDeleting(gameType.id)}>
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
