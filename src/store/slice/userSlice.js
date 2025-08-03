import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (_, action) => {
      return { ...action.payload, isLoggedIn: true };
    },
    removeUser: (state) => {
      state = null;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, removeUser } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
