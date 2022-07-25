import React from "react";
import memoriesImg from "../assets/memories.png";
const Header = () => {
	return (
		<header className="container">
			<h1>Short Blogs</h1>
			<img src={memoriesImg} alt="" />
		</header>
	);
};

export default Header;
