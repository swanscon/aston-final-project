import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export default function AdminEditGame() {
	const { id } = useParams();
	const [game, setGame] = useState({
		name: "",
		image: "",
		description: "",
		gameType: {
			id: "",
			name: "",
		},
	});
	const [gameType, setGameType] = useState({
		id: "",
		name: "",
	});
	const [gameTypes, setGameTypes] = useState([]);
	const [changesMade, setChangesMade] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				//FETCH GAME
				const gameResponse = await fetch(`http://localhost:8181/api/game/${id}`);
				if (!gameResponse.ok) {
					throw new Error("Failed to fetch game.");
				}
				const gameData = await gameResponse.json();

				//FETCH GAME TYPES
				const gameTypeResponse = await fetch(`http://localhost:8181/api/game/type`);
				if (!gameTypeResponse.ok) {
					throw new Error("Failed to fetch game types.");
				}
				const allGameTypes = await gameTypeResponse.json();
				setGameTypes(allGameTypes);

				const currentGameType = allGameTypes.find(
					(type) => type.id === gameData.gameType.id
				);
				if (currentGameType) {
					setGameType(currentGameType);
				}
				setGame({
                    id: gameData.id,
                    name: gameData.name,
                    image: gameData.image,
                    description: gameData.description,
                    gameTypeRequest: gameData.gameType
                });
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [id]);

	const handleChange = (e) => {
		setGame({
			...game,
			[e.target.name]: e.target.value,
		});
	};

	const handleChangeGameType = (e) => {
		e.preventDefault();
		const selectedId = e.target.value;
		for (const type of gameTypes) {
			if (type.id.toString() === selectedId) {
				const newGameType = {
					id: type.id,
					name: type.name,
				};
				setGameType(newGameType);
				setGame({ ...game, gameTypeRequest: newGameType });
				return;
			}
		}
		console.log(`Game type with id [${selectedId}] not found.`);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setChangesMade(false);
		try {
			const saveResponse = await fetch(`http://localhost:8181/api/game/${id}`, {
				method: "PUT",
				body: JSON.stringify(game),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!saveResponse.ok) {
				throw new Error("Failed to save changes to game.");
			}
			setChangesMade(true);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<h3>Edit Game</h3>
			<NavLink to="/admin/game">Back</NavLink>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						name="name"
						value={game.name || ""}
						onChange={handleChange}
						placeholder="Name"
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Game Type</Form.Label>
					<Form.Select name="id" value={gameType.id} onChange={handleChangeGameType}>
						<option value={game.gameType || ""}>Select a game type...</option>
						{gameTypes.map((type) => (
							<option value={type.id} key={type.id}>
								{type.name}
							</option>
						))}
					</Form.Select>
				</Form.Group>
				<Form.Group>
					<Form.Label>Image</Form.Label>
					<Form.Control
						type="text"
						name="image"
						value={game.image || ""}
						onChange={handleChange}
						placeholder="Image"
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Description</Form.Label>
					<Form.Control
						as="textarea"
						rows={4}
						maxLength={255}
						name="description"
						value={game.description || ""}
						onChange={handleChange}
						placeholder="Description"
					/>
				</Form.Group>
				<Button type="submit">Save Changes</Button>
			</Form>
			{changesMade ? <p style={{ color: "green" }}>Changes saved successfully.</p> : <></>}
		</>
	);
}
