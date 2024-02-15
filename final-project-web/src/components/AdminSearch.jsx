import { useState } from "react";

export default function AdminSearch({ onSearch }) {
	const [text, setText] = useState("");

	const handleChange = (e) => {
		setText(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSearch(text);
	};

	const handleClearSearch = () => {
		setText("");
		onSearch("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<p
				style={{ textDecoration: "underline", cursor: "pointer" }}
				onClick={handleClearSearch}
			>
				Clear
			</p>
			<input type="text" value={text} onChange={handleChange} />
			<button type="submit">Search</button>
		</form>
	);
}
