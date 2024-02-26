import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import useAuth from "../../context/AuthContext";
import "../../styles/styles.css";

export default function LoginPage() {
	const { login } = useAuth();

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
		login(user.username, user.password);
		navigate("/");
	};

	return (
		<div className="content-wrap">
			<div className="page-display">
				<Form
					onSubmit={handleSubmit}
					className="container"
					style={{ maxWidth: "420px", margin: "auto" }}
				>
					<h2 className="text-center mb-4">Login</h2>
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
					<Button type="submit" className="w-100">
						Login
					</Button>
					<div className="text-center mt-3">
						<p>
							New to TABLFG? Click here to{" "}
							<NavLink to="/signup" className="text-light">
								Signup
							</NavLink>
							!
						</p>
					</div>
				</Form>
			</div>
		</div>
	);
}
