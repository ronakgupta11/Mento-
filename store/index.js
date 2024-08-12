import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    wAddress: "",
    userInfo: "",
  },
  reducers: {
    setAccount: (state, action) => {
      state.wAddress = action.payload;
    },
    setUser: (state, action) => {
        state.userInfo = action.payload
    },
  },
});

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
  },
});

export default store;

// export the action
export const { setAccount, setUser } = loginSlice.actions;