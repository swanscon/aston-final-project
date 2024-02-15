import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyEvents from "./pages/MyEvents";
import NewEvent from "./pages/NewEvent";
import BrowseGames from "./pages/BrowseGames";
import ViewEvent from "./pages/ViewEvent";
import Admin from "./pages/Admin";
import EditEvent from "./pages/EditEvent";
import AdminGame from "./pages/AdminGame";
import AdminList from "./components/AdminList";
import AdminGameType from "./pages/AdminGameType";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/events" element={<MyEvents />} />
				<Route path="/events/new" element={<NewEvent />} />
				<Route path="/events/:id" element={<ViewEvent />} />
				<Route path="/events/:id/edit" element={<EditEvent />} />
				<Route path="/games" element={<BrowseGames />} />
				<Route path="/admin" element={<Admin />}>
					<Route index element={<AdminList />} />
					<Route path="game" element={<AdminGame />} />
					<Route path="gameType" element={<AdminGameType />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
