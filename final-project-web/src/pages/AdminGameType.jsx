import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminSearch from "../components/AdminSearch";
import GameTypeTable from "../components/GameTypeTable";
import { sortByName } from "../utils/SortByName";

export default function AdminGame() {
	const [gameTypes, setGameTypes] = useState([]);
	const [searchText, setSearchText] = useState("");

	useEffect(() => {
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
					if (searchText === "") {
						loadedGameTypes.push(gameType);
					} else if (gameType.name.toUpperCase().includes(searchText.toUpperCase())) {
						loadedGameTypes.push(gameType);
					}
				}
				setGameTypes(sortByName(loadedGameTypes));
			});
	}, [searchText]);

	return (
		<>
			<h2>Game Type management</h2>
			{/* CRUD Links here */}

			<NavLink to="/admin">Back</NavLink>
			<AdminSearch onSearch={setSearchText} />
			<GameTypeTable gameTypes={gameTypes} />
		</>
	);
}
