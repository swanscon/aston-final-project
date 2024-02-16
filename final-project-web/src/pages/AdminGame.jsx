import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminSearch from "../components/AdminSearch";
import GameTable from "../components/GameTable";
import { Button, Form } from "react-bootstrap";

export default function AdminGame() {
	const [games, setGames] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [sortParam, setSortParam] = useState("name");
	const [sortAsc, setSortAsc] = useState(true);

	useEffect(() => {
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
					if (searchText === "") {
						loadedGames.push(game);
					} else if (
						game.name.toUpperCase().includes(searchText.toUpperCase()) ||
						game.gameType.name.toUpperCase().includes(searchText.toUpperCase()) ||
						game.description.toUpperCase().includes(searchText.toUpperCase())
					) {
						loadedGames.push(game);
					}
				}
				setGames(loadedGames);
			});
	}, [searchText]);

	const handleSortBy = (e) => {
		setSortParam(e.target.value);
	};

	const handleSortOrderChange = (e) => {
		setSortAsc(e.target.id === "asc");
	};

	return (
		<>
			<h2>Game Management</h2>
			{/* CRUD Links here */}
			<div>
				<NavLink to="#">
					<Button>Create a New Game</Button>
				</NavLink>
			</div>
			<NavLink to="/admin">Back</NavLink>
			<AdminSearch onSearch={setSearchText} />
			<div>
				<Form>
				<Form.Group controlId="sortBySelect">
						<Form.Label>Sort By: </Form.Label>
						<Form.Select aria-label="Sort by" onChange={handleSortBy} value={sortParam}>
							<option value="name">Name</option>
							<option value="gameType.name">Game Type</option>
						</Form.Select>
					</Form.Group>
					<fieldset>
						<Form.Group>
							<Form.Label>Order: </Form.Label>
							<Form.Check
								inline
								type="radio"
								label="Asc"
								name="sortOrderOptions"
								id="asc"
								checked={sortAsc}
								onChange={handleSortOrderChange}
							/>
							<Form.Check
								inline
								type="radio"
								label="Desc"
								name="sortOrderOptions"
								id="desc"
								checked={!sortAsc}
								onChange={handleSortOrderChange}
							/>
						</Form.Group>
					</fieldset>
				</Form>
			</div>
			<GameTable games={games} sortParam={sortParam} sortAsc={sortAsc}/>
		</>
	);
}
