import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminSearch from "../components/AdminSearch";
import GameTable from "../components/GameTable";
import { Form } from "react-bootstrap";

export default function AdminGame() {
	const [games, setGames] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [sortParam, setSortParam] = useState("name");

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

	return (
		<>
			<h2>Game Management</h2>
			{/* CRUD Links here */}

			<NavLink to="/admin">Back</NavLink>
			<AdminSearch onSearch={setSearchText} />
			<div>
				<Form>
					<Form.Label>Sort By: </Form.Label>
					<Form.Check
						inline
						type="radio"
						label="Name"
						name="sortOptions"
						value="name"
						checked={sortParam === "name"}
						onChange={handleSortBy}
					/>
					<Form.Check
						inline
						type="radio"
						label="Type"
						name="sortOptions"
						value="gameType.name"
						checked={sortParam === "gameType.name"}
						onChange={handleSortBy}
					/>
				</Form>
			</div>
			<GameTable games={games} sortParam={sortParam} />
		</>
	);
}
