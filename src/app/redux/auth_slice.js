import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth_slice",
  initialState: { value: [] },
  reducers: {
    LOAD_AUTH_DATAS: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { LOAD_AUTH_DATAS } = authSlice.actions;

export default authSlice.reducer;
