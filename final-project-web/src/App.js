import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyEvents from "./pages/MyEvents";
import NewEvent from "./pages/NewEvent";
import BrowseGames from "./pages/BrowseGames";
import ViewEvent from "./pages/ViewEvent";
import Admin from "./pages/Admin";

function App() {
	return <div className="App">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<MyEvents />} />
            <Route path="/events/new" element={<NewEvent />} />
            <Route path="/events/:id" element={<ViewEvent />} />
            <Route path="/games" element={<BrowseGames />} />
            <Route path="/admin" element={<Admin />} />
        </Routes>
    </div>;
}

export default App;
