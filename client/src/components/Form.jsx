import React from "react";
import axios from "axios";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeInput, changeStatus, clearStates } from "../redux/formData";
import { useState } from "react";
const Form = () => {
	const dispatch = useDispatch();
	const { creator, title, message, tags } = useSelector(state => state.formData);
	const [file, setFile] = useState(undefined);
	const fileInputRef = useRef();
	const handleInputTextChange = event => {
		dispatch(changeInput({ type: event.target.name, data: event.target.value }));
	};
	const handleFileChange = event => {
		setFile(event.target.files[0]);
	};
	const handleSubmitClck = event => {
		event.preventDefault();
		let formData = new FormData();
		formData.append("Creator", creator);
		formData.append("Title", title);
		formData.append("Message", message);
		formData.append("Tags", tags);
		formData.append("file", file);
		axios
			.post(`http://localhost:3001/api/v1/memory`, formData, {
				headers: {
					"Content-type": "multipart/form-data",
				},
			})
			.then(data => {
				console.log(data);
				dispatch(changeStatus());
			});

		clearData();
	};
	const handleClearClick = event => {
		event.preventDefault();
		clearData();
	};
	const clearData = () => {
		dispatch(clearStates());
		clearFileInput();
	};
	const clearFileInput = () => {
		fileInputRef.current.value = null;
	};
	return (
		<aside className="sidebar">
			<h3>Creating a Memory</h3>
			<form className="form-container">
				<input type="text" name="creator" value={creator} onChange={handleInputTextChange} placeholder="Creator" />
				<input type="text" name="title" value={title} placeholder="Title" onChange={handleInputTextChange} />
				<textarea name="message" onChange={handleInputTextChange} value={message} placeholder="Message" id="" cols="20" rows="10" />
				<input name="tags" value={tags} type="text" onChange={handleInputTextChange} placeholder="Tags (comma seperated)" />
				<input ref={fileInputRef} type="file" onChange={handleFileChange} />
				<input type="submit" onClick={handleSubmitClck} className="submit" value="Submit" />
				<button className="clear" onClick={handleClearClick}>
					Clear
				</button>
			</form>
			{/* <img src={`base64,${demo}`} alt="nothing" /> */}
		</aside>
	);
};

export default Form;
