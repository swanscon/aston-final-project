import React, { useState, useEffect } from "react";
import MainNav from "../components/MainNav";
import { useData } from "../context/DataProvider";

export default function BrowseGames() {
    const { data } = useData();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if (
            data.games &&
            data.gameTypes &&
            data.games.length > 0 &&
            data.gameTypes.length > 0
        ) {
            setIsLoading(false);
        }
    }, [data]);

    const getGamesByType = () => {
        return data.gameTypes.map((type) => ({
            ...type,
            games: data.games.filter(
                (game) => game.gameTypeRequest.id === type.id
            ),
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
        </>
    );
}
