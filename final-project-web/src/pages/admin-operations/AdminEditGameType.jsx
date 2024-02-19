import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export default function AdminEditGameType() {
	const { id } = useParams();
	const [gameType, setGameType] = useState({
		name: "",
	});
	const [changesMade, setChangesMade] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const gameTypeResponse = await fetch(`http://localhost:8181/api/game/type/${id}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (!gameTypeResponse.ok) {
					throw new Error("Failed to fetch game type.");
				}
				const gameTypeData = await gameTypeResponse.json();
				setGameType({ name: gameTypeData.name });
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [id]);

	const handleChange = (e) => {
		setGameType({
			name: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setChangesMade(false);
		try {
			const saveResponse = await fetch(`http://localhost:8181/api/game/type/${id}`, {
				method: "PUT",
				body: JSON.stringify(gameType),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!saveResponse.ok) {
				throw new Error("Failed to save changes to game type.");
			}
			setChangesMade(true);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<h3>Edit Game Type</h3>
			<NavLink to="/admin/game-type">Back</NavLink>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						name="name"
						value={gameType.name || ""}
						onChange={handleChange}
						placeholder="Name"
					/>
				</Form.Group>
				<Button type="submit">Save Changes</Button>
			</Form>
			{changesMade ? <p style={{ color: "green" }}>Changes saved successfully.</p> : <></>}
		</>
	);
}
