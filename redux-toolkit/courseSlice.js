import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    save: (state, action) => {
      // Check if the course already exists
      const existingCourse = state.courses.find(
        (course) => course.id === action.payload.id
      );

      // If course doesn't exist, add it to the list
      if (!existingCourse) {
        state.courses.push(action.payload);
      }
    },
    removeFromSave: (state, action) => {
      state.courses = state.courses.filter(
        (course) => course.id !== action.payload
      );
    },
    clear: (state) => {
      state.courses = [];
    },
  },
});
export const { save, removeFromSave, clear } = courseSlice.actions;
export default courseSlice.reducer;
