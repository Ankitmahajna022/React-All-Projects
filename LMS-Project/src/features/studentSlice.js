import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "students",
  initialState: [
    { id: 1, name: "Ankit", email: "ankit@example.com" },
    { id: 2, name: "Mahajan", email: "mahajan@example.com" },
  ],
  reducers: {
    addStudent: (state, action) => {
      state.push(action.payload);
    },
    updateStudent: (state, action) => {
      const { id, name, email } = action.payload;
      const student = state.find((s) => s.id === id);
      if (student) {
        student.name = name;
        student.email = email;
      }
    },
    deleteStudent: (state, action) => {
      return state.filter((s) => s.id !== action.payload);
    },
  },
});

export const { addStudent, updateStudent, deleteStudent } = studentSlice.actions;
export default studentSlice.reducer;
