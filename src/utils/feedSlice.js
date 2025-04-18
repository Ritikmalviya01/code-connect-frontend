import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload; // should be { data: [...] }
    },
    removeUserFromFeed: (state, action) => {
      const updatedUsers = state.data.filter(
        (user) => user._id !== action.payload
      );
      return {
        ...state,
        data: updatedUsers,
      };
    },
  },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
