import React, { useState, useEffect } from "react";
import MainNav from "../components/MainNav";
import DummyData from "../utils/DummyData";

export default function BrowseGames() {
    const [loadedGameTypes, setLoadedGameTypes] = useState([]);
    const [loadedGames, setLoadedGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const data = DummyData();
        setLoadedGameTypes(data.gameTypes);
        setLoadedGames(data.games);
        setIsLoading(false);
    }, []);

    const getGamesByType = () => {
        return loadedGameTypes.map((type) => ({
            ...type,
            games: loadedGames.filter((game) => game.gameTypeRequest.id === type.id),
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
                                            <strong>{game.name}:</strong> {game.description}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </>
    );
}
