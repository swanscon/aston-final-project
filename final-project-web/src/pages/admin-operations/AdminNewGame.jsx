import { Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { sortByField } from "../../utils/SortByField";

export default function AdminNewGame() {
	const [gameTypes, setGameTypes] = useState([]);
	const [gameType, setGameType] = useState({
		id: "",
		name: "",
	});
	const [game, setGame] = useState({
		name: "",
		image: "",
		description: "",
		gameTypeRequest: gameType,
	});
	const [formKey, setFormKey] = useState(0);

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
					loadedGameTypes.push(gameType);
				}
				sortByField(loadedGameTypes, "name", "Asc");
				setGameTypes(loadedGameTypes);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

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

	const handleChange = (e) => {
		setGame({
			...game,
			[e.target.name]: e.target.value,
		});
	};

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const gameResponse = await fetch("http://localhost:8181/api/game", {
				method: "POST",
				body: JSON.stringify(game),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!gameResponse.ok) {
				throw new Error("Failed to create new game.");
			}
			navigate("/admin/game");
		} catch (error) {
			console.log(error);
		}
	};

	const handleClearForm = () => {
		setGameType({ id: "", name: "" });
		setGame({
			...game,
			name: "",
			image: "",
			description: "",
			gameTypeRequest: { id: "", name: "" },
		});
		setFormKey((prevKey) => prevKey + 1);
	};

	return (
		<>
			<h3>New Game</h3>
			<NavLink to="/admin/game">Back</NavLink>
			<NavLink to="#" onClick={handleClearForm}>
				Clear
			</NavLink>
			<Form onSubmit={handleSubmit} key={formKey}>
				<Form.Group>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Name"
						name="name"
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Select Type</Form.Label>
					<Form.Select name="id" value={gameType.id} onChange={handleChangeGameType}>
						<option value={gameType.name}>Select a game type...</option>
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
						placeholder="Image"
						name="image"
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Description</Form.Label>
					<Form.Control
						as="textarea"
						rows={4}
						maxLength={255}
						placeholder="Description"
						name="description"
						onChange={handleChange}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Save Changes
				</Button>
			</Form>
		</>
	);
}
