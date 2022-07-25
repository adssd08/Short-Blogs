import { configureStore } from "@reduxjs/toolkit";
import formDataSlice from "./formData";
import memoriesSlice from "./memories";
export const store = configureStore({
	reducer: {
		formData: formDataSlice,
		memories: memoriesSlice,
	},
});
