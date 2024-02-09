import MainNav from "../components/MainNav";
import { useState, useEffect } from "react";

export default function BrowseGames() {
    const [loadedGames, setLoadedGames] = useState([]);

    const DUMMY_DATA = {
        'testing': 123
    };

    useEffect(() => {
        fetch('http://localhost:8081/api/game')
            .then(response => response.json())
            .then(data => setLoadedGames(data))
            .catch(error => console.error("There was an error fetching game data", error))
    }, []);

	return (
		<>
			<MainNav />
			<div style={{ border: "solid green 2px" }}>
				<h1>Browse Games</h1>
                <ul>
                    {loadedGames.map(game => (
                        <li key={game.id}>{game.name} - {game.gameType.name}</li>
                    ))}
                </ul>
			</div>
		</>
	);
}
