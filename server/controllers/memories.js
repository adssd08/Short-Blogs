const Memory = require("../models/memory");
const getMemories = (req, res) => {
	Memory.find({})
		.then(memories => {
			res.status(200).json({ memories });
		})
		.catch(err => {
			res.status(500).json({ msg: err });
		});
};
const postMemory = (req, res) => {
	// const { path } = req.file;
	// let image = path.split("\\");
	// let imageName = image[image.length - 1];
	let Image = req.file.buffer.toString("base64");
	const { Creator, Title, Message, Tags } = req.body;
	const TagList = Tags.split(",").map(tag => {
		return { Tag: tag.trim() };
	});
	if (req.file.mimetype === "image/jpeg" || req.file.mimetype === "image/jpeg" || req.file.mimetype === "image/png") {
		Memory.create({ Creator, Title, Message, Tags: TagList, Image })
			.then(memory => {
				res.status(201).json({ memory });
			})
			.catch(err => {
				res.status(500).json({ msg: err });
			});
	} else {
		res.status(500).json({ msg: "Expected an image file" });
	}
	// console.log(req.file.buffer.toString("base64"));
};

const deleteMemory = (req, res) => {
	const { id } = req.params;
	Memory.deleteOne({ _id: id })
		.then(memory => {
			if (!memory) {
				res.status(404).json({ msg: "Memory Not Found" });
			}
			res.status(200).json({ memory });
		})
		.catch(err => {
			res.status(500).json({ msg: err });
		});
};
const editMemory = (req, res) => {
	const { id } = req.params;
	if ("Tags" in req.body) {
		req.body.Tags = req.body.Tags.split(",").map(tag => {
			return { Tag: tag.trim() };
		});
	}
	Memory.findOneAndUpdate({ _id: id }, req.body, {
		new: true,
		runValidators: true,
	})
		.then(memory => {
			if (!memory) {
				return res.status(404).json({ msg: "Memory Not Found" });
			}
			res.status(200).json({ memory });
		})
		.catch(err => {
			res.status(500).json({ msg: err });
		});
};

module.exports = { getMemories, postMemory, deleteMemory, editMemory };
