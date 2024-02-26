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
import AdminEvent from "./pages/AdminEvent";
import AdminAttendee from "./pages/AdminAttendee";
import AdminEditAttendee from "./pages/admin-operations/AdminEditAttendee";
import AdminNewAttendee from "./pages/admin-operations/AdminNewAttendee";
import AdminNewGame from "./pages/admin-operations/AdminNewGame";
import AdminEditGame from "./pages/admin-operations/AdminEditGame";
import AdminNewGameType from "./pages/admin-operations/AdminNewGameType";
import AdminEditGameType from "./pages/admin-operations/AdminEditGameType";
import AdminNewEvent from "./pages/admin-operations/AdminNewEvent";
import AdminEditEvent from "./pages/admin-operations/AdminEditEvent";
import LoginPage from "./pages/auth-operations/LoginPage";
import SignupPage from "./pages/auth-operations/SignupPage";
import { UserProtected } from "./pages/auth-operations/UserProtected";
import { AdminProtected } from "./pages/auth-operations/AdminProtected";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/games" element={<BrowseGames />} />
				<Route element={<UserProtected />}>
					<Route path="/events" element={<MyEvents />} />
					<Route path="/events/new" element={<NewEvent />} />
					<Route path="/events/:id" element={<ViewEvent />} />
					<Route path="/events/:id/edit" element={<EditEvent />} />
				</Route>
				<Route element={<AdminProtected />}>
					<Route path="/admin" element={<Admin />}>
						<Route index element={<AdminList />} />
						<Route path="game" element={<AdminGame />} />
						<Route path="game/new" element={<AdminNewGame />} />
						<Route path="game/:id" element={<AdminEditGame />} />
						<Route path="game-type" element={<AdminGameType />} />
						<Route path="game-type/new" element={<AdminNewGameType />} />
						<Route path="game-type/:id" element={<AdminEditGameType />} />
						<Route path="event" element={<AdminEvent />} />
						<Route path="event/new" element={<AdminNewEvent />} />
						<Route path="event/:id" element={<AdminEditEvent />} />
						<Route path="attendee" element={<AdminAttendee />} />
						<Route path="attendee/new" element={<AdminNewAttendee />} />
						<Route path="attendee/:id" element={<AdminEditAttendee />} />
					</Route>
				</Route>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignupPage />} />
			</Routes>
		</div>
	);
}

export default App;
