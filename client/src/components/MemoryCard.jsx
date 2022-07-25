import React from "react";
import memory from "../assets/memories.png";
import { AiTwotoneLike } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useDispatch } from "react-redux";
import { changeStatus } from "../redux/formData";
import { editMemory } from "../redux/memories";
const MemoryCard = ({ Creator, Image, Title, Message, Tags, Likes, createdAt, _id }) => {
	const dispatch = useDispatch();
	const TagList = Tags.map(tag => {
		return <li key={tag._id}>{`#${tag.Tag}`}</li>;
	});
	const handleDelete = () => {
		axios
			.delete(`http://localhost:3001/api/v1/memory/${_id}`)
			.then(data => {
				console.log(data);
				dispatch(changeStatus());
			})
			.catch(err => {
				console.log(err);
			});
	};
	const handleLike = () => {
		Likes = Likes + 1;
		axios
			.patch(`http://localhost:3001/api/v1/memory/${_id}`, {
				Likes,
			})
			.then(data => {
				console.log(data);
				dispatch(editMemory(data.data.memory));
			})
			.catch(err => {
				console.log(err);
			});
	};
	return (
		<div className="card">
			<div className="card-img-container" style={{ backgroundImage: `linear-gradient(315deg, rgb(72, 84, 97, 0.4), rgba(40, 49, 59, 0.4)),url(data:image/png;base64,${Image}` }}>
				<div className="inside-img-container">
					<div>
						<h5>{Creator}</h5>
						<h6>{new Date(createdAt).toLocaleDateString().split("/").join("-")}</h6>
						{/* <h6>2 months ago</h6> */}
					</div>
					<div>
						<button>...</button>
					</div>
				</div>
			</div>
			<div className="card-tag-container">
				<ul className="tags">{TagList}</ul>
				<h3>{Title}</h3>
				<p>{Message}</p>
				<div className="button-container">
					<div className="Like">
						<button onClick={handleLike}>
							<AiTwotoneLike />
						</button>
						<p>LIKE {Likes}</p>
					</div>
					<div className="Delete">
						<button onClick={handleDelete}>
							<MdDelete />
						</button>
						<p>DELETE</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MemoryCard;
