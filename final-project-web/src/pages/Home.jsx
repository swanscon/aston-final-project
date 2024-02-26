import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MainFooter from "../components/MainFooter";
import MainNav from "../components/MainNav";
import useAuth from "../context/AuthContext";

export default function Home() {
	const { auth } = useAuth();
	const [welcome, setWelcome] = useState("");

	useEffect(() => {
		if (!auth.token) {
			setWelcome("Welcome to TABLFG!");
		} else {
			setWelcome(`Welcome, ${auth.user}`);
		}
	}, [auth.token, auth.user]);

	return (
		<>
			<MainNav />
			<div className="content-wrap">
				<Container fluid className="page-display">
					<Row className="justify-content-center">
						<Col md={8} lg={6}>
							<h1 className="text-center mt-5">{welcome}</h1>
							<p className="text-center mt-3"></p>
							<div className="content">
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
									risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
									nec, ultricies sed, dolor. Cras elementum ultrices diam.
								</p>
								<p>
									Maecenas ligula massa, varius a, semper congue, euismod non, mi.
									Proin porttitor, orci nec nonummy molestie, enim est eleifend
									mi, non fermentum diam nisl sit amet erat. Duis semper.
								</p>
								<p>
									Duis arcu massa, scelerisque vitae, consequat in, pretium a,
									enim. Pellentesque congue. Ut in risus volutpat libero pharetra
									tempor. Cras vestibulum bibendum augue. Praesent egestas leo in
									pede.
								</p>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
			<MainFooter />
		</>
	);
}
