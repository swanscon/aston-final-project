import React, { useState, useEffect } from "react";
import MainNav from "../components/MainNav";
import { sortByName } from "../utils/SortByName";
import MainFooter from "../components/MainFooter";

export default function BrowseGames() {
    const [isLoading, setIsLoading] = useState(true);
    const [games, setGames] = useState([]);
    const [gameTypes, setGameTypes] = useState([]);

    useEffect(() => {
        setIsLoading(true);
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
                    loadedGames.push(game);
                }
                sortByName(loadedGames);
                setIsLoading(false);
                setGames(loadedGames);
            });
        setIsLoading(true);
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
                    loadedGameTypes.push(gameType);
                }
                sortByName(loadedGameTypes);
                setIsLoading(false);
                setGameTypes(loadedGameTypes);
            });
    }, []);

    const getGamesByType = () => {
        return gameTypes.map((type) => ({
            ...type,
            games: games.filter((game) => game.gameType.id === type.id),
        }));
    };

    return (
        <>
            <MainNav />
            <div style={{ border: "solid green 2px" }}>
                {isLoading ? (
                    <>
                        <h1>Browse Games</h1>
                        <p>Loading data...</p>
                    </>
                ) : (
                    <>
                        <h1>Browse Games</h1>
                        {getGamesByType().map((type) => (
                            <div key={type.id}>
                                <h2>{type.name}</h2>
                                <ul style={{ listStyle: "none" }}>
                                    {type.games.map((game) => (
                                        <li key={game.id}>
                                            <strong>{game.name}:</strong>{" "}
                                            {game.description}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </>
                )}
            </div>
            <MainFooter />
        </>
    );
}
