import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	creator: "",
	title: "",
	message: "",
	tags: "",
	status: false,
};

export const formDataSlice = createSlice({
	name: "formData",
	initialState,
	reducers: {
		changeInput(state, action) {
			let payload = action.payload;
			switch (payload.type) {
				case "creator":
					state.creator = payload.data;
					break;
				case "title":
					state.title = payload.data;
					break;
				case "message":
					state.message = payload.data;
					break;
				case "tags":
					state.tags = payload.data;
					break;
				default:
					break;
			}
		},
		clearStates(state, action) {
			state.creator = "";
			state.message = "";
			state.tags = "";
			state.title = "";
		},
		changeStatus(state, action) {
			state.status = !state.status;
		},
	},
});

export const { changeInput, clearStates, changeStatus } = formDataSlice.actions;
export default formDataSlice.reducer;
