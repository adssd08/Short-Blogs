const mongoose = require("mongoose");

const arrayLimit = val => {
	return val.length > 0 && val.length < 11;
};

const tags = mongoose.Schema({
	Tag: {
		type: String,
		trim: true,
		maxLength: [20, "Tag cannot be longer than 20 characters"],
	},
});
const memorySchema = mongoose.Schema(
	{
		Creator: {
			type: String,
			required: [true, "Creator Name Required"],
			trim: true,
			maxLength: [20, "Creator Name cannot be longer than 20 characters"],
		},
		Title: {
			type: String,
			required: [true, "Creator Name Required"],
			trim: true,
			maxLength: [50, "Creator Name cannot be longer than 20 characters"],
		},
		Message: {
			type: String,
			required: [true, "Creator Name Required"],
			trim: true,
			maxLength: [200, "Creator Name cannot be longer than 20 characters"],
		},
		Tags: {
			type: [tags],
			required: true,
			validate: [arrayLimit, "Array Length should be between 1 to 10"],
		},
		Likes: {
			type: Number,
			default: 0,
		},
		Image: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Memories", memorySchema);
