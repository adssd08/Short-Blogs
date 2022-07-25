import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMemories } from "../redux/memories";
import MemoryCard from "./MemoryCard";

const MemoryCardList = () => {
	const dispatch = useDispatch();
	const { status } = useSelector(state => state.formData);
	const { memories } = useSelector(state => state.memories);
	useEffect(() => {
		axios
			.get("http://localhost:3001/api/v1/memories")
			.then(data => {
				console.log(data.data.memories);
				dispatch(loadMemories(data.data.memories));
			})
			.catch(err => {
				console.log(err);
			});
	}, [status]);
	let memoriesList = memories.length
		? memories.map(memory => {
				return <MemoryCard key={memory._id} {...memory} />;
		  })
		: null;
	return <section className="card-container">{memoriesList}</section>;
};

export default MemoryCardList;
