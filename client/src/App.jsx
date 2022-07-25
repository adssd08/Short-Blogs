import React from "react";
import Header from "./components/Header";
import "./App.css";
import MemoryCardList from "./components/MemoryCardList";
import Form from "./components/Form";
const App = () => {
	return (
		<div>
			<Header />
			<main className="main-container">
				<MemoryCardList />
				<Form />
			</main>
		</div>
	);
};

export default App;
