import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../../context/AuthContext";

export default function SignupPage() {
	const { signup } = useAuth();

	const [user, setUser] = useState({
		username: "",
		password: "",
	});

	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		signup(user.username, user.password);
		navigate("/");
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className="mb-3" controlId="formBasicUsername">
				<Form.Label>Username</Form.Label>
				<Form.Control
					type="text"
					name="username"
					placeholder="Enter username..."
					onChange={handleChange}
                    autoComplete="current-username"
				/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="formBasicPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					name="password"
					placeholder="Enter password..."
					onChange={handleChange}
					autoComplete="current-password"
				/>
			</Form.Group>
			<Button type="submit">Signup</Button>
		</Form>
	);
}