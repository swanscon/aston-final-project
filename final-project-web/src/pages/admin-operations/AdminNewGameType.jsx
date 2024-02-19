import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

export default function AdminNewGameType() {
	const [gameType, setGameType] = useState({
		name: "",
	});
	const [formKey, setFormKey] = useState(0);

	const handleChange = (e) => {
		setGameType({ name: e.target.value });
	};

	const handleClearForm = () => {
		setGameType({ name: "" });
		setFormKey((prevKey) => prevKey + 1);
	};

    const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const gameTypeResponse = await fetch("http://localhost:8181/api/game/type", {
				method: "POST",
				body: JSON.stringify(gameType),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!gameTypeResponse.ok) {
				throw new Error("Failed to create new game type.");
			}
			navigate("/admin/gameType");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<h3>New Game</h3>
			<NavLink to="/admin/game-type">Back</NavLink>
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
				<Button type="submit">Save Game Type</Button>
			</Form>
		</>
	);
}
