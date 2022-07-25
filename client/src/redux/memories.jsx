import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	memories: [],
};

export const memoriesSlice = createSlice({
	name: "memories",
	initialState,
	reducers: {
		loadMemories(state, action) {
			state.memories = action.payload;
		},
		editMemory(state, action) {
			const index = state.memories.findIndex(memory => memory._id === action.payload._id);
			state.memories[index] = action.payload;
		},
	},
});

export const { loadMemories, editMemory } = memoriesSlice.actions;
export default memoriesSlice.reducer;
